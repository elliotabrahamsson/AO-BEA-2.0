import express, { Request, Response } from "express";
import pool from "./db";
import { stringify } from "uuid";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM "Products"`);
    const products = result.rows;

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
