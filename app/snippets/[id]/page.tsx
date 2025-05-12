import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Edit, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { getSnippetById } from "@/lib/snippets"
import { formatDistanceToNow } from "date-fns"
import CodeDisplay from "@/components/code-display"
import { notFound } from "next/navigation"
import DeleteSnippetButton from "@/components/delete-snippet-button"

export default async function SnippetPage({
  params,
}: {
  params: { id: string }
}) {
  const snippet = await getSnippetById(params.id)

  if (!snippet) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to snippets
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{snippet.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="mr-1 h-3 w-3" />
                <span>Updated {formatDistanceToNow(new Date(snippet.updatedAt), { addSuffix: true })}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Favorite
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Link href={`/snippets/${params.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <DeleteSnippetButton id={params.id} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {snippet.description && (
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{snippet.description}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium mb-2">Code</h3>
              <CodeDisplay code={snippet.code} language={snippet.language} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <div className="flex flex-wrap gap-1">
              {snippet.language && (
                <Badge variant="outline" className="bg-primary/10">
                  {snippet.language}
                </Badge>
              )}
              {snippet.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="w-full border-t pt-4 mt-2">
              <h3 className="text-sm font-medium mb-2">Related Snippets</h3>
              <p className="text-sm text-muted-foreground">No related snippets found.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
