import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [internStats, projectStats, assignmentStats] = await Promise.all([
      // Intern stats
      prisma.intern.groupBy({
        by: ['type'],
        _count: { _all: true }
      }),
      // Project stats
      prisma.project.groupBy({
        by: ['status'],
        _count: { _all: true }
      }),
      // Assignment stats
      prisma.projectAssignment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          intern: { select: { name: true, type: true } },
          project: { select: { name: true } }
        }
      })
    ])

    return NextResponse.json({
      internStats: {
        total: internStats.reduce((acc, curr) => acc + curr._count._all, 0),
        byType: internStats
      },
      projectStats: {
        total: projectStats.reduce((acc, curr) => acc + curr._count._all, 0),
        byStatus: projectStats
      },
      assignmentStats: {
        total: assignmentStats.length,
        completionRate: 0,
        recent: assignmentStats
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
} 