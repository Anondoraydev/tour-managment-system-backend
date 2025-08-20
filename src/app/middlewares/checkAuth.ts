import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { varyfyToken } from "../utils/jwt";

export const chackAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "Token not found");
      }

      const veryfiedToken = varyfyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      //authRoles = ["ADMIN", "SUPER_ADMIN"].includes(ADMIN);

      if (!authRoles.includes(veryfiedToken.role)) {
        throw new AppError(403, "Your are not authorized to view all routes");
      }

      req.user = veryfiedToken;

      next();
    } catch (error) {
      console.log("jwt error", error);
      next(error);
    }
  };
