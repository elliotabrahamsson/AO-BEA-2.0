import express, { Request, Response } from 'express';
import pool from './db';
import { stringify } from 'uuid';
import cors from 'cors';
import { get } from 'http';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
const app = express();
const PORT = 3000;

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply.aobea@gmail.com',
        pass: process.env.EMAIL_PW
    }
});

export const sendConfirmationMail = async (
    to: string,
    subject: string,
    text: string
) => {
    const mailOptions = {
        from: 'noreply.aobea@gmail.com',
        to,
        subject,
        text
    };

    try {
        const info = await transport.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['get', 'post', 'delete', 'put'],
        credentials: true
    })
);
app.use(express.json());

app.get('/products', async (req: Request, res: Response) => {
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
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/category/:type/products/:id', async (req: Request, res: Response) => {
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
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/createUser', async (req: Request, res: Response) => {
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
            newsletter
        ]);

        res.status(201).json({ message: 'User created successfully' });
        await sendConfirmationMail(
            email,
            'Welcome to AOBEA!',
            `Hello ${name},\n\nThank you for creating an account with us! We're excited to have you on board.\n\nBest regards,\nAOBEA Team`
        );
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/usersId', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT id, email FROM "Users"`);
        const users = result.rows;

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const query = `SELECT id, name, email, password FROM "Users" WHERE email = $1`;
  try {
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

    res.status(200).json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/createOrder', async (req: Request, res: Response) => {
    let {
        id,
        accountId,
        products,
        price,
        address,
        date,
        adminId,
        phone,
        email
    } = req.body;

    const emailQuery = `SELECT * FROM "Users" WHERE email = $1`;
    const emailResult = await pool.query(emailQuery, [email]);
    if (emailResult.rows.length === 0) {
        res.status(400).json({ error: 'Email not found' });
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
            phone
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
      `Hello,\n\nThank you for your order! Your order ID is ${id}.\n\nOrder Details:\nProducts: ${formattedProducts}\nTotal Price: ${price}\nShipping Address: ${address}\nOrder Date: ${date}\n\nBest regards,\nAOBEA Team`
    );
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/orders', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM "Orders"`);
        const orders = result.rows;

        // if (orders.length === 0) {
        //     return res.status(404).json({ message: 'Hittar inga ordrar' });
        // }
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfel' });
    }

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
