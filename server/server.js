const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

//server port
const port = process.env.PORT || 5000;

// Import Routes
const userRouter = require("./routers/userRouter");
const bookingRouter = require("./routers/bookingRouter");
const userAuthRouter = require("./routers/userAuthRouter");

//database
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB not connected"));

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", function (req, res) {
  res.send("hello world");
});
app.use("/user", userRouter);
app.use("/booking", bookingRouter);
app.use("/auth", userAuthRouter);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
