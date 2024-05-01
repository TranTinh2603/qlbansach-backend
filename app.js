const express = require("express");
const cors = require("cors");

// const staffsRouter = require("./app/routes/staff.route");
// const productsRouter = require("./app/routes/product.route");
const loginRouter = require("./app/routes/login.route.js");
const registerRouter = require("./app/routes/register.route.js");
const categoryRouter = require("./app/routes/category.route.js");
const orderRouter = require("./app/routes/order.route.js");
// const orderDetailRouter = require("./app/routes/orderDetail.route.js");
const bookshelvesRouter = require("./app/routes/bookshelves.route.js");
const userRouter = require("./app/routes/user.route.js");
const bookRouter = require("./app/routes/book.route.js");
const myBookRouter = require("./app/routes/myBook.route.js");
const postRouter = require("./app/routes/post.route.js");
const authorRouter = require("./app/routes/author.route.js");
const reviewRouter = require("./app/routes/review.route.js");
const friendRequestsRouter = require("./app/routes/friendRequests.router.js");
const quoteRouter = require("./app/routes/quote.route.js");
const tagRouter = require("./app/routes/tag.route.js");
const groupRouter = require("./app/routes/group.route.js");
const ApiError = require("./app/api-error.js");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/staffs", staffsRouter);
// app.use("/api/products", productsRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/categorys", categoryRouter);
app.use("/api/orders", orderRouter);
// app.use("/api/orders/detail", orderDetailRouter);
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/my-books", myBookRouter);
app.use("/api/posts", postRouter);
app.use("/api/authors", authorRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/friend-requests", friendRequestsRouter);
app.use("/api/bookshelves", bookshelvesRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/tags", tagRouter);
app.use("/api/groups", groupRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Sever Error",
    });
});
module.exports = app;