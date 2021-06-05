const express = require("express");
const app = express();
//cross platfrom
const cors = require("cors");
app.use(cors());
//to make post request
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); // for urlencoded
app.use(bodyParser.json()); // for json
//server port
const port = process.env.port | 5000;
//database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hotelReservationSystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected");
});
//route
const userRouter = require("./routers/userRouter");
const bookingRouter = require("./routers/bookingRouter");
const userAuthRouter = require("./routers/userAuthRouter");
app.use("/user", userRouter);
app.use("/booking", bookingRouter);
app.use("/userauth", userAuthRouter);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
