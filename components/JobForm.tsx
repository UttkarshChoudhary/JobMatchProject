// 'use client'

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Job } from "@/types/job"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// interface Props {
//   onJobAdded: (job: Job) => void
//   onJobUpdated: (job: Job) => void
//   jobToEdit?: Job | null
//   onCancelEdit?: () => void
// }

// const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"]

// export function JobForm({ onJobAdded, onJobUpdated, jobToEdit, onCancelEdit }: Props) {
//   const [form, setForm] = useState({
//     title: "",
//     company: "",
//     dateApplied: "",
//     status: "Applied",
//     notes: "",
//     jobLink: "",
//   })

//   useEffect(() => {
//     if (jobToEdit) {
//       setForm({
//         title: jobToEdit.title || "",
//         company: jobToEdit.company || "",
//         dateApplied: jobToEdit.dateApplied.split("T")[0],
//         status: jobToEdit.status || "Applied",
//         notes: jobToEdit.notes || "",
//         jobLink: jobToEdit.jobLink || "",
//       })
//     }
//   }, [jobToEdit])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       const res = await fetch(jobToEdit ? `/api/job-tracker/${jobToEdit._id}` : "/api/job-tracker", {
//         method: jobToEdit ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       })

//       if (!res.ok) {
//         throw new Error("Failed to submit job")
//       }

//       const data = await res.json()

//       if (jobToEdit) {
//         onJobUpdated(data.job)
//       } else {
//         onJobAdded(data.job)
//       }
// setForm({
//   title: "",
//   company: "",
//   dateApplied: "",
//   status: "Applied",
//   notes: "",
//   jobLink: "", // ✅ Add this line to clear the field
// })

      
//       if (onCancelEdit) onCancelEdit()
//     } catch (err) {
//       console.error("Error submitting job:", err)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded shadow">
//       <Input placeholder="Job Title" name="title" value={form.title} onChange={handleChange} required />
//       <Input placeholder="Company" name="company" value={form.company} onChange={handleChange} required />
//       <Input type="date" name="dateApplied" value={form.dateApplied} onChange={handleChange} required />
//         <Input
//   placeholder="Job Listing URL"
//   name="jobLink"
//   value={form.jobLink}
//   onChange={handleChange}
// />
//       <Select value={form.status} onValueChange={(value) => setForm(prev => ({ ...prev, status: value }))}>
//   <SelectTrigger className="w-full">
//  <SelectValue placeholder="Select status" />
//   </SelectTrigger>
//   <SelectContent>
//      {STATUS_OPTIONS.map((status) => (
//       <SelectItem key={status} value={status}>
//         {status}
//       </SelectItem>
//     ))}
//   </SelectContent>
// </Select>

//       <Textarea placeholder="Notes..." name="notes" value={form.notes} onChange={handleChange} className="md:col-span-3" />

//       <div className="md:col-span-3 flex gap-4">
//         <Button type="submit" className="w-full">
//           {jobToEdit ? "Update Job" : "Add Job"}
//         </Button>
//         {jobToEdit && onCancelEdit && (
//           <Button type="button" variant="outline" onClick={onCancelEdit} className="w-full">
//             Cancel
//           </Button>
//         )}
//       </div>
//     </form>
//   )
// }

'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Job } from "@/types/job"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthService } from "@/lib/auth"

interface Props {
  onJobAdded: (job: Job) => void
  onJobUpdated: (job: Job) => void
  jobToEdit?: Job | null
  onCancelEdit?: () => void
}

const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"]

export function JobForm({ onJobAdded, onJobUpdated, jobToEdit, onCancelEdit }: Props) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    dateApplied: "",
    status: "Applied",
    notes: "",
    jobLink: "",
  })

  useEffect(() => {
    if (jobToEdit) {
      setForm({
        title: jobToEdit.title || "",
        company: jobToEdit.company || "",
        dateApplied: jobToEdit.dateApplied?.split("T")[0] || "",
        status: jobToEdit.status || "Applied",
        notes: jobToEdit.notes || "",
        jobLink: jobToEdit.jobLink || "",
      })
    }
  }, [jobToEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      console.error("No user logged in.")
      return
    }

    const payload = {
      ...form,
      userId: currentUser.id,
    }

    try {
      const res = await fetch(jobToEdit ? `/api/job-tracker/${jobToEdit._id}` : "/api/job-tracker", {
        method: jobToEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Failed to submit job")
      }

      const data = await res.json()

      if (jobToEdit) {
        onJobUpdated(data.job)
      } else {
        onJobAdded(data.job)
      }

      setForm({
        title: "",
        company: "",
        dateApplied: "",
        status: "Applied",
        notes: "",
        jobLink: "",
      })

      if (onCancelEdit) onCancelEdit()
    } catch (err) {
      console.error("Error submitting job:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded shadow">
      <Input placeholder="Job Title" name="title" value={form.title} onChange={handleChange} required />
      <Input placeholder="Company" name="company" value={form.company} onChange={handleChange} required />
      <Input type="date" name="dateApplied" value={form.dateApplied} onChange={handleChange} required />
      <Input placeholder="Job Listing URL" name="jobLink" value={form.jobLink} onChange={handleChange} />

      <Select value={form.status} onValueChange={(value) => setForm(prev => ({ ...prev, status: value }))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Notes..."
        name="notes"
        value={form.notes}
        onChange={handleChange}
        className="md:col-span-3"
      />

      <div className="md:col-span-3 flex gap-4">
        <Button type="submit" className="w-full">
          {jobToEdit ? "Update Job" : "Add Job"}
        </Button>
        {jobToEdit && onCancelEdit && (
          <Button type="button" variant="outline" onClick={onCancelEdit} className="w-full">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
