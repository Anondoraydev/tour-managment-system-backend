import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { DivisionRoutes } from "../modules/division/division.route";

export const router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },

  {
    path: "/division",
    route: DivisionRoutes,
  },
  // {
  //   path: "/tour",
  //   route: TourRoutes,
  // },
  // //   {
  //     path: "/tour",
  //     route: TourRoutes,
  //   },
];

modulesRoutes.forEach(route => {
  router.use(route.path, route.route);
});

// router.use("/user",UserRoutes)
// router.use("/tour",TourRoutes)
