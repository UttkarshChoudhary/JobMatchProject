import { Job } from "@/types/job"
import { Calendar, ClipboardCheck, ExternalLink, Info, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  job: Job
  onEdit: (job: Job) => void
  onDelete: (id: string) => void
}

export function JobCard({ job, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded shadow p-4 bg-white relative">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>

      <div className="flex items-center text-sm gap-2 mt-2">
        <Calendar className="w-4 h-4" />
        <span>Applied on: {new Date(job.dateApplied).toLocaleDateString()}</span>
      </div>

      <div className="mt-2">
        <ClipboardCheck className="w-4 h-4 inline" />
        <span className="ml-1 font-medium">Status:</span> {job.status}
      </div>

      <div className="mt-2 text-gray-700">
        <Info className="w-4 h-4 inline" />
        <span className="ml-1">Notes:</span> {job.notes || "None"}
      </div>

      <div className="flex gap-2 mt-4">
        {job.jobLink && (
  <Button asChild size="sm">
  <a
    href={job.jobLink}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1"
  >
    <ExternalLink className="w-4 h-4" />
    View Listing
  </a>
</Button>
)}
        <Button variant="outline" onClick={() => onEdit(job)} size="sm">
          <Pencil className="w-4 h-4 mr-1" /> Edit
        </Button>
        <Button variant="destructive" onClick={() => onDelete(job._id!)} size="sm">
          <Trash className="w-4 h-4 mr-1" /> Delete
        </Button>
      </div>
    </div>
  )
}
