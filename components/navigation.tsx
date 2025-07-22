"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, BarChart3, FileText, Briefcase } from "lucide-react";
import { AuthService, type User as UserType } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function Navigation() {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
          onClick={() => router.push("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" ? router.push("/") : null)}
          aria-label="Go to homepage"
        >
          JobMatch
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2"
                aria-label="Go to Dashboard"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/resume-templates")}
                className="flex items-center gap-2"
                aria-label="View Resume Templates"
              >
                <FileText className="w-4 h-4" />
                Resume Templates
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/job-tracker")}
                className="flex items-center gap-2"
                aria-label="Go to Job Tracker"
              >
                <Briefcase className="w-4 h-4" />
                Job Tracker
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                    aria-label="User menu"
                  >
                    <User className="w-4 h-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/resume-templates")}>
                    <FileText className="w-4 h-4 mr-2" />
                    Resume Templates
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/job-tracker")}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Job Tracker
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button onClick={() => router.push("/signup")}>Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
