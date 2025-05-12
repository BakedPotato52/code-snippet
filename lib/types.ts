export interface Snippet {
  id: string
  title: string
  description?: string
  code: string
  language?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  userId?: string
  isPublic?: boolean
}

export interface Collection {
  id: string
  name: string
  description?: string
  snippetIds: string[]
  userId: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
}
