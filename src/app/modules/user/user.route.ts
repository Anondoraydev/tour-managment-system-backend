import { NextFunction, Request, Response, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interfaces";
import { createUserZodSchema } from "./user.validation";

const router = Router();

const chackAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "Token not found");
      }

      const veryfyToken = jwt.verify(accessToken, envVars.JWT_ACCESS_SECRET);

      // if (!veryfyToken) {
      //   console.log(veryfyToken);
      //   throw new AppError(403, `Your are not authorized ${veryfyToken}`);
      // }
      console.log(veryfyToken);

      if ((veryfyToken as JwtPayload).role !== Role.ADMIN) {
        throw new AppError(403, "Your are not authorized to view all routes");
      }

      console.log(veryfyToken);

      next();
    } catch (error) {
      console.log("jwt error", error);
      next(error);
    }
  };
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/all-users",
  chackAuth("ADMIN", "SUPER_ADMIN"),
  UserControllers.getAllUsers
);

export const UserRoutes = router;
