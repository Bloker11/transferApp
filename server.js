import express from "express";
import "express-async-errors";
import { notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { connectDB } from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import transRouter from './routes/transRoutes.js'
import dotenv from "dotenv";
import cors from 'cors';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import { corsOptions, credentials} from './middleware/corsConfig.js'
import verifyJWT from './middleware/verifyJWT.js';
dotenv.config();


const app = express();


//middleware for parsing urlencoded data in get requests
app.use(express.urlencoded({extended: true}))
//middleware for reading out json
app.use(express.json())


if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
//for the credentials to be set: this ensures the origins are allowed
app.use(credentials)

//for the cookies to be handled
//middleware for cookies
app.use(cookieParser())

//middleware for cross origin resource sharing
app.use(cors(corsOptions))


app.get("/", (req, res) => {
  //throw new Error('error')
  res.send("Welcome");
});
app.get("/api/v1", (req, res) => {
  //throw new Error('error')
  res.json("afsaf");
});

app.use("/api/v1/auth", authRouter);

//every request to the routes following this bit of middleware will have access token verification
app.use(verifyJWT)

//routes to the transactions following verification bit of middleware
app.use('/api/v1/trans', transRouter)





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
