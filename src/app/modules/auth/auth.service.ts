import bcryptjs from "bcryptjs";
import httpsStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interfaces";
import { User } from "../user/user.model";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpsStatus.BAD_REQUEST, "Email does not exist");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(httpsStatus.BAD_REQUEST, "Password does not match");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, "secret", {
    expiresIn: "1d",
  });

  return {
    accessToken,
  };
};

export const AuthService = {
  credentialsLogin,
};
