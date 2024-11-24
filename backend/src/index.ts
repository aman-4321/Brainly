import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes";

const app: Express = express();

const port = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content");
app.use("/api/v1/share");

app.listen(port);
