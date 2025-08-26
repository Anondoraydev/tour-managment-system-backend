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
    division: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: true,
    },
    tourType: {
      type: Schema.Types.ObjectId,
      ref: "TourType",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tourSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title.toLowerCase().split(" ").join("-");
    let slug = baseSlug;
    let counter = 0;

    while (await Tour.exists({ slug })) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    this.slug = slug;
  }
  next();
});

tourSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<ITour>;

  if (update.title) {
    const baseSlug = update.title.toLowerCase().split(" ").join("-");
    let slug = baseSlug;
    let counter = 0;

    while (await Tour.exists({ slug })) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    update.slug = slug;
    this.setUpdate(update);
  }

  next();
});

export const Tour = model<ITour>("Tour", tourSchema);
