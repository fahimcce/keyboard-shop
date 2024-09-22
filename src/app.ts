import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// application routes
app.use("/api", router);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("/", test);

//global error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
