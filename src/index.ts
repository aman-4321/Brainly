import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

app.listen(port);
