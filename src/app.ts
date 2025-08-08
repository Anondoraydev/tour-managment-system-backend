import cors from "cors";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globleErrorHandler"; 
import { router } from "./app/routes";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Wellcome to Tour Management System",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
