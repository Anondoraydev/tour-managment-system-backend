import { Types } from "mongoose";


export interface ITourType {
    name: string;
    // slug: string;
    // thumbnail?: string;
    // description?: string;
}


export interface ITour {
  titele: string;
  slug: string;
  description: string;
  images?: string[];
  location?: string;
  costFrom?: number;
  startDate?: Date;
  includes?: string[];
  excludes?: string[];
  amenities?: string[];
  tourPlan?: string[];
  maxGuest?: number;
  minAge?: number;
  division: Types.ObjectId;
  tourType: Types.ObjectId;
}
