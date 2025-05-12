import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = password

    // Create user with appropriate approval status
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

      },
    })
    const { password: _, ...userWithoutPassword } = user

    // Return success response
    return NextResponse.json({ user: userWithoutPassword, message: "User registered successfully" }, { status: 201 })


  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}
