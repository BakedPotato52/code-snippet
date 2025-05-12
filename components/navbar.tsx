"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Code, LogOut, PlusCircle, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleLogout = async () => {

    await signOut({ redirect: true, callbackUrl: "/login" })
    router.push("/login")        // Redirect to login page after logout
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Code className="h-5 w-5" />
          <span>CodeVault</span>
        </Link>
        <nav className="ml-4 flex gap-4 sm:gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Home
          </Link>
          <Link
            href="/explore"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/explore" ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Explore
          </Link>
          {session?.user && (
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {session?.user ? (
            <>
              <Link href="/snippets/new">
                <Button size="sm" className="hidden sm:flex">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Snippet
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session?.user.image || "/placeholder.svg"} alt={"user"} />
                      <AvatarFallback>{'K'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session?.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session?.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
