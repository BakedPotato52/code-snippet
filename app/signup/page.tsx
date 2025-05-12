"use client"

import React, { useState, useCallback, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Loader2 } from 'lucide-react'

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false })
const MotionForm = dynamic(() => import("framer-motion").then((mod) => mod.motion.form), { ssr: false })

const RegisterPage: React.FC = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)

      try {
        const formData = new FormData(e.currentTarget)

        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),

          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Registration failed")
        }

        // Sign in the user (this would be handled by your auth system)
        toast.success("Registration successful! Redirecting to login...")
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
    [router]
  )

  // Enhanced animations
  const cardAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
    }),
    []
  )

  const formAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.2, duration: 0.4, ease: "easeOut" },
    }),
    []
  )

  const gradientAnimation = useMemo(
    () => ({
      initial: { x: "-100%" },
      animate: { x: 0 },
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }),
    []
  )

  const staggeredFieldAnimation = useMemo(
    () => ({
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.3 },
    }),
    []
  )


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
        </MotionDiv>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <MotionDiv {...cardAnimation}>
        <Card className="w-full max-w-md overflow-hidden">
          <MotionDiv
            {...gradientAnimation}
            className="h-2 bg-gradient-to-r from-rose-500 to-red-500"
          />
          <CardHeader className="space-y-2">
            <MotionDiv
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </MotionDiv>
          </CardHeader>
          <CardContent>
            <MotionForm onSubmit={handleSubmit} className="space-y-4" {...formAnimation}>
              <MotionDiv {...staggeredFieldAnimation} transition={{ delay: 0.1 }}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                    autoCapitalize="words"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                  />
                </div>
              </MotionDiv>

              <MotionDiv {...staggeredFieldAnimation} transition={{ delay: 0.2 }}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                  />
                </div>
              </MotionDiv>

              <MotionDiv {...staggeredFieldAnimation} transition={{ delay: 0.3 }}>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                  />
                </div>
              </MotionDiv>







              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </MotionDiv>
            </MotionForm>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                  Sign in
                </Link>
              </p>
            </MotionDiv>
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  )
})

RegisterPage.displayName = "RegisterPage"

export default RegisterPage
