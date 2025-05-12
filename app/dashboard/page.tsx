"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Filter, SortDesc } from "lucide-react"
import Link from "next/link"
import SnippetCard from "@/components/snippet-card"
import { useAuth } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { getSnippets } from "@/lib/snippets"
import type { Snippet } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchSnippets = async () => {
      setIsLoading(true)
      try {
        const data = await getSnippets(searchQuery)
        setSnippets(data)
      } catch (error) {
        console.error("Error fetching snippets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSnippets()
  }, [user, router, searchQuery])

  const filteredSnippets = snippets.filter((snippet) => {
    if (activeTab === "all") return true
    if (activeTab === "recent") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return new Date(snippet.updatedAt) > oneWeekAgo
    }
    if (activeTab === "favorites") {
      // In a real app, you would have a favorites field
      return snippet.id === "1" // Mock favorite for demo
    }
    return true
  })

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get("q") as string
    setSearchQuery(query)
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Your Snippets</h1>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <form onSubmit={handleSearch}>
              <Input type="search" placeholder="Search snippets..." name="q" className="pl-8 w-full" />
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Language: JavaScript</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Language: Python</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Language: CSS</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Tag: React</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SortDesc className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Date: Newest First</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Date: Oldest First</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Name: A-Z</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Name: Z-A</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/snippets/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Snippet
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Snippets</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {isLoading ? (
            <SnippetSkeleton />
          ) : filteredSnippets.length === 0 ? (
            <EmptyState query={searchQuery} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="recent">
          {isLoading ? (
            <SnippetSkeleton />
          ) : filteredSnippets.length === 0 ? (
            <EmptyState message="No recent snippets found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="favorites">
          {isLoading ? (
            <SnippetSkeleton />
          ) : filteredSnippets.length === 0 ? (
            <EmptyState message="No favorite snippets found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SnippetSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ query, message }: { query?: string; message?: string }) {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold mb-2">No snippets found</h2>
      <p className="text-muted-foreground mb-6">
        {query ? `No results for "${query}"` : message || "Create your first code snippet to get started"}
      </p>
      <Link href="/snippets/new">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Snippet
        </Button>
      </Link>
    </div>
  )
}
