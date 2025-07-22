export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface MatchHistory {
  id: string
  userId: string
  resumeFileName: string
  jobTitle: string
  jobCompany?: string
  overallScore: number
  matchedSkills: string[]
  missingSkills: string[]
  strengths: string[]
  improvements: string[]
  keywordMatches: number
  totalKeywords: number
  createdAt: string
}

export class AuthService {
  private static USERS_KEY = "jobmatch_users"
  private static CURRENT_USER_KEY = "jobmatch_current_user"
  private static MATCH_HISTORY_KEY = "jobmatch_match_history"

  static getUsers(): User[] {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem(this.USERS_KEY)
    return users ? JSON.parse(users) : []
  }

  static saveUsers(users: User[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
  }

  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(this.CURRENT_USER_KEY)
    return user ? JSON.parse(user) : null
  }

  static setCurrentUser(user: User | null): void {
    if (typeof window === "undefined") return
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY)
    }
  }

  static async signup(
    email: string,
    password: string,
    name: string,
  ): Promise<{ success: boolean; error?: string; user?: User }> {
    const users = this.getUsers()

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exists" }
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    this.saveUsers(users)
    this.setCurrentUser(newUser)

    return { success: true, user: newUser }
  }

  static async login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    const users = this.getUsers()
    const user = users.find((u) => u.email === email)

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    this.setCurrentUser(user)
    return { success: true, user }
  }

  static logout(): void {
    this.setCurrentUser(null)
  }

  static getMatchHistory(userId: string): MatchHistory[] {
    if (typeof window === "undefined") return []
    const history = localStorage.getItem(this.MATCH_HISTORY_KEY)
    const allHistory: MatchHistory[] = history ? JSON.parse(history) : []
    return allHistory
      .filter((match) => match.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  static saveMatchResult(matchResult: Omit<MatchHistory, "id" | "createdAt">): void {
    if (typeof window === "undefined") return
    const history = localStorage.getItem(this.MATCH_HISTORY_KEY)
    const allHistory: MatchHistory[] = history ? JSON.parse(history) : []

    const newMatch: MatchHistory = {
      ...matchResult,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    allHistory.push(newMatch)
    localStorage.setItem(this.MATCH_HISTORY_KEY, JSON.stringify(allHistory))
  }
}
