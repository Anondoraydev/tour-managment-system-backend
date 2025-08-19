import { Router } from "express";
import { chackAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interfaces";
import { createUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/all-users",
  chackAuth(Role.SUPER_ADMIN, Role.ADMIN),
  UserControllers.getAllUsers
);
router.patch(
  "/:id",
  chackAuth(...Object.values(Role)),
  UserControllers.updatedUser
);
//api/v1/user/:id

export const UserRoutes = router;
