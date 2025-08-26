import express from "express";
import { chackAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interfaces"; 
import { TourController } from "./tour.controller";
import {
  createTourTypeZodSchema,
  createTourZodSchema,
  updateTourZodSchema,
} from "./tour.validation";

const router = express.Router();

/* ------------------ TOUR TYPE ROUTES -------------------- */
router.get("/tour-types", TourController.getAllTourTypes);

router.post(
  "/create-tour-type",
  chackAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourController.createTourType
);

router.patch(
  "/tour-types/:id",
  chackAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourController.updateTourType
);

router.delete(
  "/tour-types/:id",
  chackAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.deleteTourType
);

/* --------------------- TOUR ROUTES ---------------------- */
router.get("/", TourController.getAllTours);

router.post(
  "/create",
  chackAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  TourController.createTour
);

router.patch(
  "/:id",
  chackAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTourZodSchema),
  TourController.updateTour
);

router.delete(
  "/:id",
  chackAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.deleteTour
);

export const TourRoutes = router;
