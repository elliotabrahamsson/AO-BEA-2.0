import express, { Request, Response } from "express";
import pool from "./db";
import { stringify } from "uuid";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM "Products"`);

    let html = `
    <html>
        <head>
          <title>Produkter</title>
          <style>
            body { font-family: sans-serif; }
            .produkt { margin-bottom: 20px; }
            img { max-width: 200px; height: auto; }
          </style>
        </head>
        <body>
          <h1>Produktlista</h1>  
  `;
    result.rows.forEach((row) => {
      html += `
        <div class="produkt">
          <h2>${row.product_name}</h2>
          <img src="${row.product_img}" alt="${row.name}">
          <p>${row.product_description}</p>
          <p>Price: ${row.price} kr</p>
        </div>
      `;
    });

    html += `
        </body>
      </html>
    `;

    res.send(html);
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
