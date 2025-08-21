import { Router } from "express";
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

export const AuthRoutes = router;
