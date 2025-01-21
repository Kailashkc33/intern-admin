import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { InternType } from '@prisma/client'

export async function GET() {
  try {
    const interns = await prisma.intern.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        _count: {
          select: { assignments: true }
        }
      }
    })

    return NextResponse.json(interns)
  } catch (error) {
    console.error('Error fetching interns:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interns' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const intern = await prisma.intern.create({
      data: {
        email: json.email,
        name: json.name,
        type: json.type as InternType,
        status: json.status || 'ACTIVE'
      }
    })

    return NextResponse.json(intern, { status: 201 })
  } catch (error) {
    console.error('Error creating intern:', error)
    return NextResponse.json(
      { error: 'Failed to create intern' },
      { status: 500 }
    )
  }
} 