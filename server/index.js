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
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser')

dotenv.config();
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Соединение к базе данных успешно..."))
    .catch((err) => {
        console.log(err);
    });

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
    
        console.log(req.body.name);
        cb(null, req.body.name);
    
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);


app.listen(5000, () => {
    console.log("Backend server is running!")
});
