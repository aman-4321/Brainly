import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, type Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { contentRouter } from "./routes/contentRoutes";
import { shareRouter } from "./routes/shareRoutes";
import { userRouter } from "./routes/userRoutes";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8082;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP, please try again later",
});

if (process.env.NODE_ENV === "production") {
  app.use(limiter);
}

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/share", shareRouter);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
