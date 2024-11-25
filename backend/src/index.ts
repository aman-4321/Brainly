import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes";
import { contentRouter } from "./routes/contentRoutes";
import { shareRouter } from "./routes/shareRoutes";
import rateLimit from "express-rate-limit";

const app: Express = express();

const port = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 20,
//   message: "Too many requests from this IP, please try again later",
// });
//
// app.use(limiter);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/share", shareRouter);

app.listen(port);
