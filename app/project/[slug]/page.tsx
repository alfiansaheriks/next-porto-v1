"use client";

import React, { useEffect, useState } from "react";
import alfiansaherikgans from "@/app/assets/erikganz.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { Skeleton } from "@nextui-org/skeleton";

interface Project {
  name: string;
  description: string;
  createdAt: string;
  icon: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function goBack() {
    router.back();
  }

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/project/${params.slug}`
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setError("Failed to fetch project");
      }
    };

    fetchProject();
  }, [params.slug, apiUrl]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center mt-10">
        <Skeleton className="w-1/2 h-10 mb-4" />
        <div className="flex flex-row justify-between text-gray-500 py-4 w-full">
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
        <Skeleton className="w-full h-40" />
        <Button onClick={goBack} className="flex items-start mt-4 px-2 py-2 text-xs w-[10%] h-[1%] rounded-lg bg-transparent hover:bg-gray-100 hover:border hover:border-gray-200 shadow-none font-bold text-gray-500">
          <FontAwesomeIcon icon={faArrowLeftLong} className="mt-0.5 mr-2" />
          Go back
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <h1 className="font-bold text-2xl lg:text-5xl py-2">{project.name}</h1>
        <div className="flex flex-row justify-between text-gray-500 py-4 w-full">
          <p className="flex items-center text-xs lg:text-base mt-2 lg:mt-0 text-gray-400">{formatDate(project.createdAt)}</p>
          <hr className="w-[50%] lg:w-[80%] mt-[10%] h-0.5 lg:h-1 mx-auto my-4 bg-slate-200 border-0 rounded md:my-10 dark:bg-gray-700" />
          <Image
            src={alfiansaherikgans}
            alt="Alfiansah Erik"
            className="flex items-center mt-3 w-10 h-10 lg:w-20 lg:h-20 rounded-full"
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: project.description }}
          className="text-xs text-gray-400 lg:text-base w-full text-justify"
        />
      </div>
      <Button onClick={goBack} className="flex items-start mt-10 lg:mt-4 px-8 py-2 lg:px-2 lg:py-2 text-xs w-[10%] h-[1%] rounded-lg bg-transparent hover:bg-gray-100 hover:border hover:border-gray-200 shadow-none font-bold text-gray-500">
        <FontAwesomeIcon icon={faArrowLeftLong} className="mt-0.5 mr-2" />
        Go back
      </Button>
    </>
  );
}