"use client"

import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Copy, Check, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "c",
  "cpp",
  "csharp",
  "go",
  "rust",
  "php",
  "ruby",
  "swift",
  "kotlin",
  "html",
  "css",
  "sql",
  "bash",
  "json",
  "yaml",
  "markdown",
  "plaintext",
]

export default function CodeEditor({
  code,
  onChange,
  language,
}: {
  code: string
  onChange: (code: string) => void
  language?: string
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(language || "plaintext")
  const [editorHeight, setEditorHeight] = useState("300px")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (language) {
      setSelectedLanguage(language)
    }
  }, [language])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setEditorHeight(isFullscreen ? "300px" : "calc(100vh - 200px)")
  }

  return (
    <div className={cn("w-full transition-all duration-200", isFullscreen && "fixed inset-0 z-50 bg-background p-6")}>
      <div className="bg-muted p-2 flex justify-between items-center border-b">
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-8 w-8">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono text-sm p-4 rounded-none focus-visible:ring-0 resize-none"
        style={{
          height: editorHeight,
          tabSize: 2,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
        placeholder="// Enter your code here"
      />
    </div>
  )
}
