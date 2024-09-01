// index.js
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// PostgreSQL client setup
const pool = new Pool({
  user: "apple",
  host: "postgresql://apple:JNzFPHq1qzxOCQ7hfw2IYmoAv52Qqr4y@dpg-cra94i23esus739sd0jg-a.frankfurt-postgres.render.com/apple_wsqw",
  database: "apple_wsqw",
  password: "JNzFPHq1qzxOCQ7hfw2IYmoAv52Qqr4y",
  port: 5432,
});

// Middleware to parse JSON bodies
app.use(express.json());

// Function to insert data into PostgreSQL
const insertData = async (param1, param2, param3) => {
  const query =
    "INSERT INTO your_table_name_2 (column1, column2, column3) VALUES ($1, $2, $3)";
  const values = [param1, param2, param3];
  try {
    await pool.query(query, values);
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
};

// POST route
app.post("/add-data", async (req, res) => {
  const { param1, param2, param3 } = req.body;

  if (!param1 || !param2 || !param3) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  await insertData(param1, param2, param3);
  res.status(200).json({ message: "Data inserted successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
