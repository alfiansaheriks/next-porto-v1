import React from "react";
import { Metadata } from "next";
import PageContent from "./PageContent";

interface PostProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: PostProps): Promise<Metadata> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/posts/${slug}`);
  const data = await response.json();
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const keywords = tags.length > 0 ? tags.join(", ") : "web development, JavaScript, React, Next.js, frontend, backend, full-stack, programming, coding, software engineering, technology, tutorial, guide, best practices, performance, SEO, web design, UI/UX, API, cloud computing";

  return {
    title: data.title,
    description: data.content,
    keywords: keywords,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <PageContent slug={params.slug} />;
}