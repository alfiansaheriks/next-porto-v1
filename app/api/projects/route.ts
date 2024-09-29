import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    const project = await fetchProjectBySlug(slug);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function fetchProjectBySlug(slug: string) {
  try {
    const res = await fetch(`http://localhost:3333/projects/${slug}`);
    if (!res.ok) {
      throw new Error('Failed to fetch project');
    }

    const project = await res.json();
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}