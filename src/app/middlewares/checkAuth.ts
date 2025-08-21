import { NextFunction, Request, Response } from "express";
import httpsStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { isActive } from "../modules/user/user.interfaces";
import { User } from "../modules/user/user.model";
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

      const isUserExist = await User.findOne({ email: veryfiedToken.email });

      if (!isUserExist) {
        throw new AppError(httpsStatus.BAD_REQUEST, "User does not exist");
      }

      if (isUserExist.isActive === isActive.BLOCKED) {
        throw new AppError(
          httpsStatus.BAD_REQUEST,
          `User is ${isUserExist.isActive}`
        );
      }

      if (isUserExist.isDeleted) {
        throw new AppError(httpsStatus.BAD_REQUEST, "User is deleted");
      }

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
