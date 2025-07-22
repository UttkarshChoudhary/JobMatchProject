"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AuthService, type User, type MatchHistory } from "@/lib/auth"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
  Target,
  BarChart3,
  Plus,
  MessageSquare,
  Sun,
  Moon
} from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }

    setUser(currentUser)
    const history = AuthService.getMatchHistory(currentUser.id)
    setMatchHistory(history)
    setIsLoading(false)

    // Optional: check user preference or localStorage here for dark mode
    const savedMode = localStorage.getItem("darkMode")
    if (savedMode === "true") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [router])

  // Toggle dark mode handler
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev
      if (newMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      localStorage.setItem("darkMode", newMode.toString())
      return newMode
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </div>
    )
  }

  if (!user) return null

  const averageScore =
    matchHistory.length > 0
      ? Math.round(matchHistory.reduce((sum, match) => sum + match.overallScore, 0) / matchHistory.length)
      : 0

  const recentMatches = matchHistory.slice(0, 3)
  const scoreImprovement = matchHistory.length >= 2 ? matchHistory[0].overallScore - matchHistory[1].overallScore : 0

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900"
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900"
    return "bg-red-100 dark:bg-red-900"
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800`}>
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 dark:text-gray-300">Track your job matching progress and improvements</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle Button */}
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              className="flex items-center gap-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  Dark Mode
                </>
              )}
            </Button>

            <Button onClick={() => router.push("/feedback")} className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Feedback
            </Button>
            <Button onClick={() => router.push("/")} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Analysis
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Analyses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{matchHistory.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</p>
                </div>
                <Target className="w-8 h-8 text-green-500 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Recent Improvement</p>
                  <div className="flex items-center gap-1">
                    <p className={`text-2xl font-bold ${scoreImprovement >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {scoreImprovement > 0 ? "+" : ""}
                      {scoreImprovement}%
                    </p>
                    {scoreImprovement >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Best Score</p>
                  <p
                    className={`text-2xl font-bold ${getScoreColor(Math.max(...matchHistory.map((m) => m.overallScore), 0))}`}
                  >
                    {matchHistory.length > 0 ? Math.max(...matchHistory.map((m) => m.overallScore)) : 0}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {matchHistory.length === 0 ? (
          /* Empty State */
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No analyses yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start by uploading your resume and comparing it with job postings to track your progress.
              </p>
              <Button onClick={() => router.push("/")} className="flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Create Your First Analysis
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Matches */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
                <CardDescription>Your latest job matching results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMatches.map((match) => (
                  <div
                    key={`${match.id}-${match.createdAt}`}
                    className="border rounded-lg p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{match.jobTitle}</h4>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(match.overallScore)} ${getScoreColor(match.overallScore)}`}
                      >
                        {match.overallScore}%
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(match.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {match.resumeFileName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">{match.matchedSkills.length} skills matched</span>
                      <span className="text-red-600 dark:text-red-400">{match.missingSkills.length} skills missing</span>
                    </div>
                    <Progress value={(match.keywordMatches / match.totalKeywords) * 100} className="h-2 mt-2" />
                  </div>
                ))}
                {matchHistory.length > 3 && (
                  <Button variant="outline" className="w-full bg-transparent dark:text-gray-200">
                    View All Analyses ({matchHistory.length})
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Development</CardTitle>
                <CardDescription>Most frequently matched and missing skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Top Matched Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(
                        matchHistory
                          .flatMap((m) => m.matchedSkills)
                          .reduce((acc, skill) => {
                            acc.set(skill, (acc.get(skill) || 0) + 1)
                            return acc
                          }, new Map()),
                      )
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 8)
                        .map(([skill, count]) => (
                          <Badge key={skill} variant="secondary" className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                            {skill} ({count})
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Skills to Develop</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(
                        matchHistory
                          .flatMap((m) => m.missingSkills)
                          .reduce((acc, skill) => {
                            acc.set(skill, (acc.get(skill) || 0) + 1)
                            return acc
                          }, new Map()),
                      )
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 8)
                        .map(([skill, count]) => (
                          <Badge key={skill} variant="outline" className="border-red-200 dark:border-red-700 text-red-700 dark:text-red-300">
                            {skill} ({count})
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
