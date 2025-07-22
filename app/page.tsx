"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Zap, Target, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setResumeFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) return

    setIsAnalyzing(true)

    // Simulate analysis time
    setTimeout(() => {
      // Store data in sessionStorage for the results page
      sessionStorage.setItem("resumeFileName", resumeFile.name)
      sessionStorage.setItem("jobDescription", jobDescription)
      router.push("/results")
    }, 2000)
  }

  const isReadyToAnalyze = resumeFile && jobDescription.trim().length > 50

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">JobMatch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get AI-powered insights on how well your resume matches any IT job posting. Upload your resume, paste the
            job description, and discover your compatibility score.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Upload Resume</h3>
            <p className="text-gray-600 text-sm">Support for PDF and DOCX files with intelligent parsing</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
            <p className="text-gray-600 text-sm">AI-powered matching of skills, experience, and requirements</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Actionable Insights</h3>
            <p className="text-gray-600 text-sm">Get specific suggestions to improve your resume</p>
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Upload Your Resume
                </CardTitle>
                <CardDescription>Upload your resume in PDF or DOCX format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-gray-500">PDF or DOCX (max 10MB)</p>
                    </label>
                  </div>
                  {resumeFile && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">Resume uploaded successfully</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Job Description
                </CardTitle>
                <CardDescription>Paste the complete job posting you want to match against</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="job-description">Job Posting Content</Label>
                    <Textarea
                      id="job-description"
                      placeholder="Paste the full job description here, including requirements, responsibilities, and qualifications..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="min-h-[200px] mt-2"
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    {jobDescription.length} characters (
                    {jobDescription.length < 50 ? "minimum 50 required" : "ready for analysis"})
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analyze Button */}
          <div className="text-center mt-8">
            <Button
              onClick={handleAnalyze}
              disabled={!isReadyToAnalyze || isAnalyzing}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Match...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2" />
                  Analyze Compatibility
                </>
              )}
            </Button>
            {!isReadyToAnalyze && (
              <p className="text-sm text-gray-500 mt-2">
                Please upload a resume and enter a job description to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
