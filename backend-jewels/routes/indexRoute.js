const express = require("express");
const routes = express.Router();

routes.use("/api/auth", require("./authRoute"));
routes.use("/api/admin", require("./adminRoute"));
routes.use("/api/category", require("./categoryRoute"));
routes.use("/api/subcategory", require("./subcategoryRoute"));
routes.use("/api/product", require("./productRoute"));
routes.use("/api/order", require("./orderRoute"));

module.exports = routes;
