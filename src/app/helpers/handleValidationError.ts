/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse, TErrorSources } from "../interfaces/error.types";

export const handlerValidationError = (err: any): TErrorResponse => {
  const errorSources: TErrorSources[] = [];

  const errors = Object.values(err.errors);

  errors.forEach((errorObject: any) =>
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    })
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
