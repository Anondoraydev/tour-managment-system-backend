import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

//auth prividers

export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export enum isActive {
  ACTIVE = "ACTIVE",
  ISACTIVE = "ISACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: isActive;
  isVerified?: string;
  role?: Role;
  auths: IAuthProvider[];
  bookings?: Types.ObjectId;
  guides?: Types.ObjectId;
}
