import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { chackAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post("/logout", AuthControllers.logout);
router.post(
  "/reset-password",
  chackAuth(...Object.values(Role)),
  AuthControllers.resetPassword
);
router.get(
  "/google",

  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { scope: ["email", "profile"] })(
      req,
      res,
      next
    );
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  AuthControllers.googleCallbackController
);

export const AuthRoutes = router;
