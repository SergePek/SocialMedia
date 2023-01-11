const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

dotenv.config();
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Соединение к базе данных успешно..."))
    .catch((err) => {
        console.log(err);
    });
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);


app.listen(5000, () => {
    console.log("Backend server is running!")
});
