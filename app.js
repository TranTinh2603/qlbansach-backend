const express = require("express");
const cors = require("cors");
const staffsRouter = require("./app/routes/staff.route");
const productsRouter = require("./app/routes/product.route");
const loginRouter = require("./app/routes/login.route.js");
const registerRouter = require("./app/routes/register.route.js");
const categoryRouter = require("./app/routes/category.route.js");
const orderRouter = require("./app/routes/order.route.js");
const orderDetailRouter = require("./app/routes/orderDetail.route.js");
const customerRouter = require("./app/routes/customer.route.js");
const ApiError = require("./app/api-error.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/staffs", staffsRouter);
app.use("/api/products", productsRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/categorys",categoryRouter);
app.use("/api/orders",orderRouter);
app.use("/api/orders/detail", orderDetailRouter);
app.use("/api/customers",customerRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Sever Error",
    });
});
module.exports = app;