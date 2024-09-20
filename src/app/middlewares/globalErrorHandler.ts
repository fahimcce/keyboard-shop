import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import AppError from "../errors/AppError";
import config from "../config";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};
