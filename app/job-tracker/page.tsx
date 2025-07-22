'use client'

import { useEffect, useState } from "react"
import { Job } from "@/types/job"
import { JobForm } from "@/components/JobForm"
import { JobCard } from "@/components/JobCard"
import { Navigation } from "@/components/navigation"
import { AuthService } from "@/lib/auth"

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null)

  useEffect(() => {
  const currentUser = AuthService.getCurrentUser()
  if (!currentUser) return

  fetch(`/api/job-tracker?userId=${currentUser.id}`)
    .then(res => res.json())
    .then(data => setJobs(data))
}, [])

  const handleJobAdded = (newJob: Job) => {
    setJobs(prev => [...prev, newJob])
  }

  const handleJobUpdated = (updatedJob: Job) => {
    setJobs(prev =>
      prev.map(job => job._id === updatedJob._id ? updatedJob : job)
    )
    setJobToEdit(null)
  }

  const handleCancelEdit = () => {
    setJobToEdit(null)
  }

  const handleJobDelete = async (id: string) => {
    const res = await fetch(`/api/job-tracker/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      setJobs(prev => prev.filter(job => job._id !== id))
    } else {
      console.error("Failed to delete job")
    }
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Job Tracker</h1>
          </div>

          {/* Form */}
          <div className="mb-8">
            <JobForm
              onJobAdded={handleJobAdded}
              jobToEdit={jobToEdit}
              onJobUpdated={handleJobUpdated}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map(job => (
              <JobCard
                key={job._id}
                job={job}
                onEdit={() => setJobToEdit(job)}
                onDelete={() => handleJobDelete(job._id!)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
