const express = require("express");
require('dotenv').config();
const http = require("http");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const db = require("./config/db");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
console.log(process.env.FRONTEND);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  
  // API to fetch all products
  socket.on("getProducts", () => {
    db.query("SELECT * FROM products", (err, results) => {
      if (err) {
        console.error("Error fetching products from DB:", err);
        return;
      }
      socket.emit("productList", results);
    });
  });

  // Handle stock updates
  socket.on("updateStock", (productId, newStock) => {
    db.query(
      "UPDATE products SET stock = ? WHERE id = ?",
      [newStock, productId],
      (err, result) => {
        if (err) {
          console.error("Error updating stock:", err);
          return;
        }
        // Send updated products list to all clients
        db.query("SELECT * FROM products", (err, results) => {
          if (err) {
            console.error("Error fetching products from DB:", err);
            return;
          }
          io.emit("productList", results);
        });
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server on port 5000
server.listen(PORT, () => {
  console.log(`Backend server is runn1ing on ${process.env.BASEURL}`);
});
