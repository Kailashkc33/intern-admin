import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { AssignmentStatus } from "@prisma/client"

// Define the expected context type for Next.js route handlers
interface RouteContext {
  params: { id: string }
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const assignment = await prisma.projectAssignment.findUnique({
      where: { id: context.params.id },
      include: {
        intern: {
          select: {
            name: true,
            type: true,
            status: true,
          },
        },
        project: {
          select: {
            name: true,
            status: true,
          },
        },
      },
    })

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
    }

    return NextResponse.json(assignment)
  } catch (error) {
    console.error("Error fetching assignment:", error)
    return NextResponse.json({ error: "Failed to fetch assignment" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const body = await request.json()

    const updatedAssignment = await prisma.projectAssignment.update({
      where: { id: context.params.id },
      data: {
        status: body.status as AssignmentStatus,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        internId: body.internId,
        projectId: body.projectId,
      },
      include: {
        intern: {
          select: {
            name: true,
            type: true,
            status: true,
          },
        },
        project: {
          select: {
            name: true,
            status: true,
          },
        },
      },
    })

    return NextResponse.json(updatedAssignment)
  } catch (error) {
    console.error("Error updating assignment:", error)
    return NextResponse.json({ error: "Failed to update assignment" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await prisma.projectAssignment.delete({
      where: { id: context.params.id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting assignment:", error)
    return NextResponse.json({ error: "Failed to delete assignment" }, { status: 500 })
  }
}

