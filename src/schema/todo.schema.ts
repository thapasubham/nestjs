import * as mongoose from "mongoose";

export const TODOSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: Boolean, default: false },

  deletedAt: { type: Date, default: null },
}, {
  timestamps: true,
});