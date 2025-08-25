/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse, TErrorSources } from "../interfaces/error.types";

export const handelerZodError = (err: any): TErrorResponse => {
  const errorSources: TErrorSources[] = [];

  err.issues.forEach((issue: any) => {
    errorSources.push({
      // path: "nickname inside last name",
      // path: issue.path.length > 1 && issue.path.reverse().join("inside"),
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    });
  });

  return {
    statusCode: 400,
    message: "Zod error",
    errorSources,
  };
};
