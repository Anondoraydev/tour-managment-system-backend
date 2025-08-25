import mongoose from "mongoose";
import { TErrorResponse } from "../interfaces/error.types";

export const handaerCastError = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  err: mongoose.Error.ValidationError
): TErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid mongoDB object id. Plase provide a valid mongoDB id",
  };
};
