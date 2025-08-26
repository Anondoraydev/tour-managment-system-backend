import { Router } from "express"; 
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interfaces"; 
 
import { chackAuth } from "../../middlewares/checkAuth";
import { createDivisionSchema, updateDivisionSchema } from "./division.validation";
import { DivisionController } from "./division.controller";

const router = Router()

router.post(
    "/create",
    chackAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createDivisionSchema),
    DivisionController.createDivision
);
router.get("/", DivisionController.getAllDivisions);
router.get("/:slug", DivisionController.getSingleDivision)
router.patch(
    "/:id",
    chackAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateDivisionSchema), 
    DivisionController.updateDivision
);
router.delete("/:id", chackAuth(Role.ADMIN, Role.SUPER_ADMIN), DivisionController.deleteDivision);

export const DivisionRoutes = router