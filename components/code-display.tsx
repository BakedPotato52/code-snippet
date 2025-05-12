"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CodeDisplay({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={cn("relative", isFullscreen && "fixed inset-0 z-50 bg-background p-6 flex flex-col")}>
      <div className={cn("absolute right-2 top-2 flex gap-1", isFullscreen && "right-6 top-6")}>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="h-8 w-8 bg-background/80 backdrop-blur-sm"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="h-8 w-8 bg-background/80 backdrop-blur-sm"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
      <pre className={cn("bg-muted p-4 rounded-md overflow-x-auto", isFullscreen && "flex-1 overflow-y-auto")}>
        <code
          className="text-sm font-mono"
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        >
          {code}
        </code>
      </pre>
      {isFullscreen && <div className="mt-4 text-sm text-muted-foreground">Language: {language || "Unknown"}</div>}
    </div>
  )
}
