require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
import route from "./routes";
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err: any) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });
const corsOptions = {
  origin: ["https://hocthongminh-nextjs.vercel.app", "http://localhost:4000"],
};
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors(corsOptions));

app.use(cookieParser());
app.get("/", (req: any, res: any) => {
  res.json({ message: "Server is running :D" });
});

let PORT = process.env.PORT || 3001;

route(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
