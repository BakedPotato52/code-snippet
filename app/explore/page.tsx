import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import SnippetCard from "@/components/snippet-card"
import { getSnippets } from "@/lib/snippets"

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""
  const snippets = await getSnippets(query)

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Explore Snippets</h1>
          <p className="text-muted-foreground">Discover useful code snippets from the community</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <form>
            <Input
              type="search"
              placeholder="Search snippets..."
              name="q"
              defaultValue={query}
              className="pl-8 w-full"
            />
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>

      {snippets.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">No snippets found</h2>
          <p className="text-muted-foreground mb-6">
            {query ? "Try a different search term" : "Be the first to share a snippet!"}
          </p>
          <Link href="/snippets/new">
            <Button>Share a Snippet</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
