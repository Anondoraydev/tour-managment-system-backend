/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

// const createUserFunction = async (req: Request, res: Response, next: NextFunction) => {
//   const user = await UserService.createUser(req.body);

//   res.status(httpStatus.CREATED).json({
//     message : "user created successfully",
//     user
//   })
// };

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // throw new Error("fack error")
//     // throw new AppError(httpStatus.BAD_REQUEST, "fack error");

//     createUserFunction(req, res);
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "user created successfully",
      user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUsers();

    // res.status(httpStatus.OK).json({
    //   message: "users fetched successfully",
    //   data: users,
    // });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "All Users Retrieved successfully",
      data: result,
      meta: result.meta,
    });
  }
);

//function -> try-catch => req-res function

export const UserControllers = {
  createUser,
  getAllUsers,
};

//routes matching -> controller -> service -> model -> DB
