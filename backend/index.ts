import express, { Request, Response } from "express";
import pool from "./db";
import cors from "cors";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const app = express();
const PORT = 3000;

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: "noreply.aobea@gmail.com",
    pass: process.env.EMAIL_PW,
  },
});

export const sendConfirmationMail = async (
  to: string,
  subject: string,
  text: string
) => {
  const mailOptions = {
    from: "noreply.aobea@gmail.com",
    to,
    subject,
    text,
  };

  try {
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const JWT_SECRET = "process.env.JWT";

function authenticateToken(req: Request, res: Response, next: Function) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user && typeof user === "object" && "id" in user) {
      (req as any).userId = (user as any).id; // antag att token payload har { id: ... }
      next();
    }
  });
}

const allowedOrigins = [
  "http://localhost:5173",
  "https://ao-bea-2-0-client.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🔍 Origin som försöker nå API:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
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
  const { name, email, password, created, newsletter } = req.body;

  const query = `
  INSERT INTO "Users" (name, email, password, created, newsletter)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id, email`;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(query, [
      name,
      email,
      hashedPassword,
      created,
      newsletter,
    ]);

    const user = result.rows[0];

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User created successfully", token, user });
    await sendConfirmationMail(
      email,
      "Welcome to AOBEA!",
      `Hello ${name},\n\nThank you for creating an account with us! We're excited to have you on board.\n\nBest regards,\nAOBEA Team`
    );
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
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const adminQuery = `SELECT id, name, email, password FROM "Admin" WHERE email = $1`;

    const adminResult = await pool.query(adminQuery, [email]);

    if (adminResult.rows.length > 0) {
      const admin = adminResult.rows[0];

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid password" });
        return;
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email, name: admin.name, isAdmin: true },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        id: admin.id,
        email: admin.email,
        name: admin.name,
        isAdmin: true,
      });
    } else {
      const query = `SELECT id, name, email, password FROM "Users" WHERE email = $1`;

      const result = await pool.query(query, [email]);

      if (result.rows.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const user = result.rows[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid password" });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        id: user.id,
        email: user.email,
        name: user.name,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/createOrder", async (req: Request, res: Response) => {
  let { id, accountId, products, price, address, date, adminId, phone, email } =
    req.body;

  const emailQuery = `SELECT * FROM "Users" WHERE email = $1`;
  const emailResult = await pool.query(emailQuery, [email]);
  if (emailResult.rows.length === 0) {
    res.status(400).json({ error: "Email not found" });
    return;
  }

  accountId = emailResult.rows[0].id;

  const query = `
  INSERT INTO "Orders" (id, account_id, products, price, address, date, admin_id, phone)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
      phone,
    ]);

    const mailQuery = `SELECT email FROM "Users" WHERE id = $1`;
    const mailResult = await pool.query(mailQuery, [accountId]);
    const email = mailResult.rows[0].email;

    const formattedProducts = products
      .map(
        (product: {
          name: string;
          size: string;
          color: string;
          quantity: number;
        }) =>
          `${product.name} Size: ${product.size}, Color: ${product.color}, Quantity: ${product.quantity}`
      )
      .join(", ");

    await sendConfirmationMail(
      email,
      "Order Confirmation",
      `Hello,\n\nThank you for your order! Your order ID is ${id}.\n\nOrder Details:\nProducts: ${formattedProducts}\nTotal Price: ${price}kr\nShipping Address: ${address}\nOrder Date: ${date}\n\nBest regards,\nAOBEA Team`
    );
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/orders", authenticateToken, async (req: Request, res: Response) => {
  let userId = (req as any).userId;

  try {
    const result = await pool.query(
      `SELECT "Orders".id, "Orders".date, "Orders".price, "Orders".products, "Orders".address, "Users".id AS user_id, "Users".email
      FROM "Orders"
      JOIN "Users" ON "Orders".account_id = "Users".id
      WHERE "Users".id = $1
      ORDER BY "Orders".date DESC`,
      [userId]
    );
    const orders = result.rows;

    // if (orders.length === 0) {
    //     return res.status(404).json({ message: 'Hittar inga ordrar' });
    // }
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
