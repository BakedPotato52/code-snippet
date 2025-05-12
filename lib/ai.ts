"use server"

// This is a mock AI service
// In a real app, you would use OpenAI or another AI service
export async function analyzeCode(code: string) {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple language detection based on code patterns
  const language = detectLanguage(code)

  // Generate tags based on the code content and detected language
  const tags = generateTags(code, language)

  return {
    language,
    tags,
  }
}

function detectLanguage(code: string): string {
  // Very simple language detection based on keywords and syntax
  if (
    code.includes("import React") ||
    code.includes("useState") ||
    (code.includes("function") && code.includes("return") && (code.includes("jsx") || code.includes("<div")))
  ) {
    return "javascript"
  }

  if ((code.includes("def ") && code.includes(":")) || (code.includes("import ") && code.includes("print("))) {
    return "python"
  }

  if (code.includes("{") && code.includes("}") && (code.includes(".class") || code.includes("#id"))) {
    return "css"
  }

  if (code.includes("SELECT") && code.includes("FROM")) {
    return "sql"
  }

  if (code.includes("<html") || code.includes("<!DOCTYPE html")) {
    return "html"
  }

  // Default fallback
  return ""
}

function generateTags(code: string, language: string): string[] {
  const tags: string[] = []

  // Add language as a tag
  if (language) {
    tags.push(language)
  }

  // JavaScript/React specific tags
  if (language === "javascript") {
    if (code.includes("useState")) tags.push("hooks")
    if (code.includes("useEffect")) tags.push("effects")
    if (code.includes("React.memo") || code.includes("useMemo")) tags.push("optimization")
    if (code.includes("<div") || code.includes("render")) tags.push("react")
    if (code.includes("fetch(") || code.includes("axios")) tags.push("api")
    if (code.includes("async") && code.includes("await")) tags.push("async")
  }

  // Python specific tags
  if (language === "python") {
    if (code.includes("def ")) tags.push("functions")
    if (code.includes("class ")) tags.push("classes")
    if (code.includes("for ") || code.includes("while ")) tags.push("loops")
    if (code.includes("[") && code.includes("for")) tags.push("list-comprehension")
    if (code.includes("import pandas")) tags.push("pandas")
    if (code.includes("import numpy")) tags.push("numpy")
  }

  // CSS specific tags
  if (language === "css") {
    if (code.includes("display: flex")) tags.push("flexbox")
    if (code.includes("display: grid")) tags.push("grid")
    if (code.includes("@media")) tags.push("responsive")
    if (code.includes("animation") || code.includes("transition")) tags.push("animation")
  }

  return tags
}
