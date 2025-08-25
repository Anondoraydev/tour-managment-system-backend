import { TErrorResponse } from "../interfaces/error.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handlerDuplicateError = (err: any): TErrorResponse => {
  const matchArray = err.message.match(/"([^"]*)"/);

  return {
    statusCode: 400,
    message: `${matchArray[1]} already exists`,
  };
};