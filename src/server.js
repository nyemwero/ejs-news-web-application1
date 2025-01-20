"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
// Load environment variables
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Basic route
app.get("/", function (req, res) {
    res.send("Welcome to the News Web Application!");
});
// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
// Start the server
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
