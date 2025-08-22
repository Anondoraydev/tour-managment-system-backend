import bcryptjs from "bcryptjs";
import httpsStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interfaces";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpsStatus.BAD_REQUEST, "User already exist");
  }

  const hasedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUNDS)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hasedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const updateUaer = async (
  userId: string,
  payload: Partial<IUser>,
  detectedToken: JwtPayload
) => {
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppError(httpsStatus.NOT_FOUND, "User does not exist");
  }

  /**
   * email cannot not be updated
   * name, phone, password, address
   * password - re hashing
   * only admin superadmin - role, isDeleted...
   *
   * promoting to superadmin -superadmin
   */

  if (payload.role) {
    if (detectedToken.role === Role.USER || detectedToken.role === Role.GUIDE) {
      throw new AppError(httpsStatus.FORBIDDEN, "You are not authorized");
    }

    if (
      payload.role === Role.SUPER_ADMIN &&
      detectedToken.role === Role.ADMIN
    ) {
      throw new AppError(httpsStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (detectedToken.role === Role.USER || detectedToken.role === Role.GUIDE) {
      throw new AppError(httpsStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUNDS)
    );
  }
  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

const getAllUsers = async () => {
  const users = await User.find({});

  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
}; 
export const UserService = {
  createUser,
  getAllUsers,
  updateUaer,
};
