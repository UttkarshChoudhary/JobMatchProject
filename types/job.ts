export interface Job {
  _id?: string
  title: string
  company: string
  dateApplied: string      // ISO string
  status: "Applied" | "Interview" | "Offer" | "Rejected"
  notes?: string
  jobLink?: string
  userId: string            // 👈 add this field
}
