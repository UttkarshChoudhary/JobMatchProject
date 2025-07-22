import mongoose, { Schema, model, models } from "mongoose"

const JobSchema = new Schema({
  title: String,
  company: String,
  dateApplied: Date,
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer", "Rejected"],
    default: "Applied",
  },
  notes: String,
  jobLink: String,
  userId: { type: String, required: true }, // ✅ make sure this is included
})


export const Job = models.Job || model("Job", JobSchema)

