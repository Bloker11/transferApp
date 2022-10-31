import express from "express";
import "express-async-errors";
import { notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { connectDB } from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  //throw new Error('error')
  res.send("Welcome");
});
app.get("/api/v1", (req, res) => {
  //throw new Error('error')
  res.json("afsaf");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
})();
