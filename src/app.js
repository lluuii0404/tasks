const express = require("express");

const database = require("./database.json");

const app = express();

// TODO: posts
// TODO: comments
// TODO: albums
// TODO: albums
// TODO: todos
// TODO: users

// Example of endpoints
app.get("/users", (req, res) => {
  // Get all users
});

app.get("/users/:id", (req, res) => {
  // Get user by id
});

app.post("/users", (req, res) => {
  // Create new user
});

app.patch("/user/:id", (req, res) => {
  // Update user field by id
});

app.delete("/user/:id", (req, res) => {
  // Delete user by id
});

module.exports = app;
