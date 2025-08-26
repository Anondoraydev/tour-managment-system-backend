import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interfaces";

const tourTypeSchema = new Schema<ITourType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TourType = model<ITourType>("TourType", tourTypeSchema);

const tourSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    location: { type: String },
    costFrom: { type: Number },
    startdate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuset: { type: Number },
    minAge: { type: Number },
    divistion: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: true,
    },
    tureType: {
      type: Schema.Types.ObjectId,
      ref: "TourType",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Tour = model<ITour>("Tour", tourSchema);
