import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: String,
  status: { type: String, default: "Available" },
  merged: { type: Boolean, default: false },
  mergedBy: { type: String, default: null },
  mergedAt: { type: Date, default: null }

})

export const Applications = mongoose.model("Applications", applicationSchema)
