import { Button } from "@/components/ui/button"
import { Code, Zap, Database, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <>
      <main>
        <Navbar />

        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Store, organize, and share your code snippets
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    CodeVault helps you manage your code snippets with AI-powered tagging and organization. Never lose a
                    useful piece of code again.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="h-12">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button size="lg" variant="outline" className="h-12">
                      Explore Snippets
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
                  <Image
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Code Snippet Manager"
                    width={1280}
                    height={720}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your code snippets efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Syntax Highlighting</h3>
                    <p className="text-muted-foreground">
                      Supports over 20 programming languages with beautiful syntax highlighting.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">AI-Powered Tagging</h3>
                    <p className="text-muted-foreground">Automatically tag and categorize your code snippets using AI.</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Organized Collections</h3>
                    <p className="text-muted-foreground">
                      Create collections to organize your snippets by project or category.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Share2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Easy Sharing</h3>
                    <p className="text-muted-foreground">
                      Share your snippets with teammates or make them public for the community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to organize your code?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of developers who use CodeVault to manage their code snippets.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg">Get Started for Free</Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline">
                    Explore Snippets
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} CodeVault. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
