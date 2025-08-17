import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

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
  //   {
  //     path: "/tour",
  //     route: TourRoutes,
  //   },
];

modulesRoutes.forEach(route => {
  router.use(route.path, route.route);
});

// router.use("/user",UserRoutes)
// router.use("/tour",TourRoutes)
