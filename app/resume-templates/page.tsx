'use client'

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const templates = [
  {
    role: "Software Developer",
    file: "/templates/software-developer-resume.docx",
    preview: "/templates/software-developer-resume.pdf",
    description:
      "Ideal for front-end or full-stack developers with experience in modern JavaScript frameworks and backend technologies.",
  },
  {
    role: "Accountant",
    file: "/templates/accountant-resume.docx",
    preview: "/templates/accountant-resume.pdf",
    description:
      "Best suited for accounting professionals with skills in budgeting, forecasting, and financial reporting.",
  },
  {
    role: "Banker",
    file: "/templates/banker-resume.docx",
    preview: "/templates/banker-resume.pdf",
    description:
      "Crafted for roles in banking and finance, focusing on customer service, financial analysis, and compliance.",
  },
]

export default function ResumeTemplates() {
  const [search, setSearch] = useState("")

  const filteredTemplates = templates.filter((template) =>
    template.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Title and Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Download Resume Templates</h1>
            <Input
              type="text"
              placeholder="Search by role..."
              className="max-w-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTemplates.map((template, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-lg">{template.role}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{template.description}</p>
                  <embed
                    key={template.preview}
                    src={`${template.preview}#${new Date().getTime()}`}
                    type="application/pdf"
                    className="w-full h-64 rounded border"
                  />
                  <a
                    href={template.file}
                    download
                    className="block w-fit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download .docx
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
