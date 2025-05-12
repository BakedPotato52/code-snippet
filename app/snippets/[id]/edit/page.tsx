import SnippetForm from "@/components/snippet-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSnippetById } from "@/lib/snippets"
import { notFound } from "next/navigation"

export default async function EditSnippetPage({
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
      <Card>
        <CardHeader>
          <CardTitle>Edit Snippet</CardTitle>
          <CardDescription>Update your code snippet</CardDescription>
        </CardHeader>
        <CardContent>
          <SnippetForm snippet={snippet} />
        </CardContent>
      </Card>
    </div>
  )
}
