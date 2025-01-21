import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { AssignmentStatus } from "@prisma/client"

// Correctly define the context type for Next.js route handlers
export function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return prisma.projectAssignment.findUnique({
    where: { id: params.id },
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
  .then(assignment => {
    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
    }
    return NextResponse.json(assignment)
  })
  .catch(error => {
    console.error("Error fetching assignment:", error)
    return NextResponse.json({ error: "Failed to fetch assignment" }, { status: 500 })
  })
}

export function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return request.json()
    .then(body => {
      return prisma.projectAssignment.update({
        where: { id: params.id },
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
    })
    .then(updatedAssignment => {
      return NextResponse.json(updatedAssignment)
    })
    .catch(error => {
      console.error("Error updating assignment:", error)
      return NextResponse.json({ error: "Failed to update assignment" }, { status: 500 })
    })
}

export function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return prisma.projectAssignment.delete({
    where: { id: params.id },
  })
  .then(() => {
    return new NextResponse(null, { status: 204 })
  })
  .catch(error => {
    console.error("Error deleting assignment:", error)
    return NextResponse.json({ error: "Failed to delete assignment" }, { status: 500 })
  })
}

