import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const skip = (page - 1) * pageSize;

    const [assignments, totalCount] = await Promise.all([
      prisma.projectAssignment.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          intern: {
            select: { name: true, type: true }
          },
          project: {
            select: { name: true }
          }
        }
      }),
      prisma.projectAssignment.count()
    ]);

    return NextResponse.json({
      assignments,
      totalRecords: totalCount
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const assignment = await prisma.projectAssignment.create({
      data: {
        internId: json.internId,
        projectId: json.projectId,
        startDate: new Date(json.startDate),
        endDate: json.endDate ? new Date(json.endDate) : null,
        status: 'ACTIVE'
      },
      include: {
        intern: {
          select: { name: true, type: true }
        },
        project: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json(
      { error: 'Failed to create assignment' },
      { status: 500 }
    );
  }
}
