import express, { Request, Response } from "express";
import pool from "./db";
import { stringify } from "uuid";
import cors from "cors";
import { get } from "http";
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["get", "post", "delete", "put"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`  SELECT
    "Products".id AS product_id,
    "Products".product_name AS product_name,
    "Products".product_description AS product_description,
    "Products".product_img AS product_img,
    "Products".price,
    "Products".size AS size,
    "Products".colors AS color,
    "Products".gender as gender,
    "Category".type AS category_type,
    "Brands".name AS brand_name
  FROM "Products"
  JOIN "Category" ON "Products".category = "Category".id
  JOIN "Brands" ON "Products".brands = "Brands".id`);
    const products = result.rows;

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products/:id", async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  const query = `
  SELECT
    "Products".id AS product_id,
    "Products".product_name AS product_name,
    "Products".product_description AS product_description,
    "Products".product_img AS product_img,
    "Products".price,
    "Products".size AS size,
    "Products".colors AS color
    FROM "Products"
    WHERE "Products".id = $1
    `;

  /*const query2 = `
  SELECT 
  "Category".type AS category_type
  FROM "Category"
  WHERE "Category" = $1`; */

  try {
    const result = await pool.query(query, [productId]);

    if (result.rows.length > 0) {
      const product = result.rows[0];
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
