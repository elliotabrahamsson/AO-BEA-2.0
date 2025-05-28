import express, { Request, Response } from "express";
import pool from "./db";
import { stringify } from "uuid";
import cors from "cors";
import { get } from "http";
const bcrypt = require("bcrypt");
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

app.get("/category/:type/products/:id", async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const categoryType = req.params.type;

  const query = `
  SELECT
    "Products".id AS product_id,
    "Products".product_name AS product_name,
    "Products".product_description AS product_description,
    "Products".product_img AS product_img,
    "Products".price,
    "Products".size AS size,
    "Products".colors AS color,
    "Products".gender AS gender,
    "Category".type AS category_type
    FROM "Products"
    JOIN "Category" ON "Products".category = "Category".id
    WHERE "Products".id = $1 AND "Category".type = $2
    `;

  /*const query2 = `
  SELECT
  "Category".type AS category_type
  FROM "Category"
  WHERE "Category" = $1`; */

  try {
    const result = await pool.query(query, [productId, categoryType]);

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

app.post("/createUser", async (req: Request, res: Response) => {
  const { id, name, email, password, created, newsletter } = req.body;

  const query = `
  INSERT INTO "Users" (id, name, email, password, created, newsletter)
  VALUES ($1, $2, $3, $4, $5, $6)`;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool.query(query, [
      id,
      name,
      email,
      hashedPassword,
      created,
      newsletter,
    ]);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/usersId", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT id, email FROM "Users"`);
    const users = result.rows;

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/createOrder", async (req: Request, res: Response) => {
  const { id, accountId, products, price, address, date, adminId } = req.body;
  const query = `
  INSERT INTO "Orders" (id, account_id, products, price, address, date, admin_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  try {
    await pool.query(query, [
      id,
      accountId,
      JSON.stringify(products),
      price,
      address,
      date,
      adminId,
    ]);
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
