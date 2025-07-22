"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, TrendingUp, FileText, Target, Lightbulb, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { AuthService } from "@/lib/auth"

interface MatchResult {
  overallScore: number
  resumeFileName: string
  jobTitle: string
  matchedSkills: string[]
  missingSkills: string[]
  strengths: string[]
  improvements: string[]
  keywordMatches: number
  totalKeywords: number
}

export default function ResultsPage() {
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading and analysis
    const resumeFileName = sessionStorage.getItem("resumeFileName")
    const jobDescription = sessionStorage.getItem("jobDescription")

    if (!resumeFileName || !jobDescription) {
      router.push("/")
      return
    }

    // Simulate analysis results
    setTimeout(() => {
      const mockResult: MatchResult = {
        overallScore: 78,
        resumeFileName,
        jobTitle: "Senior Full Stack Developer",
        matchedSkills: [
          "JavaScript",
          "React",
          "Node.js",
          "TypeScript",
          "Git",
          "REST APIs",
          "MongoDB",
          "AWS",
          "Docker",
          "Agile",
        ],
        missingSkills: ["GraphQL", "Kubernetes", "Redis", "Microservices", "CI/CD", "Jest", "PostgreSQL"],
        strengths: [
          "Strong frontend development experience with React and TypeScript",
          "Solid backend experience with Node.js and database management",
          "Good understanding of cloud platforms and containerization",
          "Experience with version control and collaborative development",
        ],
        improvements: [
          "Add GraphQL experience to your resume - it's mentioned as a key requirement",
          "Highlight any CI/CD pipeline experience you may have",
          "Consider adding testing frameworks like Jest to your skill set",
          "Emphasize microservices architecture experience if applicable",
        ],
        keywordMatches: 23,
        totalKeywords: 31,
      }
      setMatchResult(mockResult)
      setIsLoading(false)

      const currentUser = AuthService.getCurrentUser()
      if (currentUser) {
        AuthService.saveMatchResult({
          userId: currentUser.id,
          resumeFileName: mockResult.resumeFileName,
          jobTitle: mockResult.jobTitle,
          jobCompany: "Tech Corp", // You can extract this from job description
          overallScore: mockResult.overallScore,
          matchedSkills: mockResult.matchedSkills,
          missingSkills: mockResult.missingSkills,
          strengths: mockResult.strengths,
          improvements: mockResult.improvements,
          keywordMatches: mockResult.keywordMatches,
          totalKeywords: mockResult.totalKeywords,
        })
      }
    }, 1500)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing your resume...</p>
        </div>
      </div>
    )
  }

  if (!matchResult) {
    return null
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Match Results</h1>
            <p className="text-gray-600">
              {matchResult.resumeFileName} vs {matchResult.jobTitle}
            </p>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall Compatibility</h2>
                <p className="text-gray-600">Based on skills, experience, and keyword matching</p>
              </div>
              <div className={`text-center p-6 rounded-full ${getScoreBg(matchResult.overallScore)}`}>
                <div className={`text-4xl font-bold ${getScoreColor(matchResult.overallScore)}`}>
                  {matchResult.overallScore}%
                </div>
                <div className="text-sm text-gray-600 mt-1">Match Score</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Keyword Matches</span>
                <span>
                  {matchResult.keywordMatches}/{matchResult.totalKeywords}
                </span>
              </div>
              <Progress value={(matchResult.keywordMatches / matchResult.totalKeywords) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Matched Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                Matched Skills
              </CardTitle>
              <CardDescription>Skills from your resume that align with the job requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {matchResult.matchedSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Missing Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                Missing Skills
              </CardTitle>
              <CardDescription>Skills mentioned in the job posting that weren't found in your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {matchResult.missingSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-200 text-red-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Star className="w-5 h-5" />
                Your Strengths
              </CardTitle>
              <CardDescription>Areas where your background strongly aligns with the role</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {matchResult.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Improvement Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Lightbulb className="w-5 h-5" />
                Improvement Suggestions
              </CardTitle>
              <CardDescription>Actionable recommendations to strengthen your application</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {matchResult.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={() => router.push("/")} variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Analyze Another Job
          </Button>
          <Button onClick={() => window.print()}>
            <Target className="w-4 h-4 mr-2" />
            Save Results
          </Button>
        </div>
      </div>
    </div>
  )
}
