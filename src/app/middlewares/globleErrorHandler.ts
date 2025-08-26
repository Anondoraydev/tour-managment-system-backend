/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { handaerCastError } from "../helpers/handleCastError";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";
import { handlerValidationError } from "../helpers/handleValidationError";
import { handelerZodError } from "../helpers/handleZodError";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.log(err);
  }

  let errorSources: TErrorSources[] = [];

  let statusCode = 500;
  let message = "Something went wrong!!!";

  // Duplicate Error
  if (err.code === 11000) {
    const simplifiedError = handlerDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // Object Id error / Cast Error
  else if (err.name === "CastError") {
    const simplifiedError = handaerCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err.name === "ZodError") {
    const simplifiedError = handelerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;

    errorSources = simplifiedError.errorSources as TErrorSources[];

    err.issues.forEach((issue: any) => {
      errorSources.push({
        path: issue.path[issue.path.length - 1],
        // path: "nickname inside last name",
        // path: issue.path.length > 1 && issue.path.reverse().join("inside"),
        message: issue.message,
      });
    });
  }
  // mongoose validation error
  else if (err.name === "ValidationError") {
    const simplifiedError = handlerValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
