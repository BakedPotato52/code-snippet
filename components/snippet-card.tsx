import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import type { Snippet } from "@/lib/types"
import { CodeIcon, Star, Clock } from "lucide-react"

export default function SnippetCard({ snippet, isFavorite }: { snippet: Snippet; isFavorite?: boolean }) {
  return (
    <Link href={`/snippets/${snippet.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between gap-2 text-lg">
            <div className="flex items-center gap-2 truncate">
              <CodeIcon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{snippet.title}</span>
            </div>
            {isFavorite && <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {snippet.description || "No description provided"}
          </p>
          <div className="flex flex-wrap gap-1">
            {snippet.language && (
              <Badge variant="outline" className="bg-primary/10">
                {snippet.language}
              </Badge>
            )}
            {snippet.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {snippet.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{snippet.tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground border-t pt-3 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {snippet.updatedAt
              ? `Updated ${formatDistanceToNow(new Date(snippet.updatedAt), {
                  addSuffix: true,
                })}`
              : ""}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
