"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import alfiansaherikgans from "../assets/erikganz.jpg";
import { Skeleton } from "@nextui-org/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import ProjectList from "../components/ProjectList";

interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  slug: string;
  icon: string;
}

const PostsPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/projects`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const detectDevice = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  
  useEffect(() => {
    detectDevice(); // Initial check
  
    window.addEventListener("resize", detectDevice); // Add event listener for resize
  
    return () => {
      window.removeEventListener("resize", detectDevice); // Clean up event listener on unmount
    };
  }, []);



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full mx-auto w-full">
        <div className=" flex-1 flex flex-row justify-between items-center mt-10 lg:mt-0">
          <div>
            <h1 className="text-lg font-semibold">
              Hey, I&apos;m Alfiansah Erik Sugiarto — a full stack dev.
            </h1>
            <h1 className="text-md font-semibold text-gray-500">
              Crafting Seamless Solutions in Cyberspace,
              <br />
              Bridging the World of Full Stack Web Development.
            </h1>
          </div>
          {!isMobile && (
            <div>
              <Image
                src={alfiansaherikgans}
                alt="Alfiansah Erik"
                className="w-24 h-24 rounded-full"
              />
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg mt-10 border-2 border-gray-200 relative lg:w-full p-6">
          <h2 className="absolute -top-3 left-5 bg-white border-2 border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
            Posts
          </h2>
          <div className="overflow-hidden max-h-64">
            <div className="overflow-y-auto max-h-64 scrollbar-hidden">
              <ul className="list-none p-0">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li
                    key={index}
                    className="mb-2 bg-slate-100 rounded-md hover:border p-2 flex items-center"
                  >
                    <Skeleton className="h-4 w-4 mr-2" />
                    <div className="flex justify-between w-full">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col h-full mx-auto w-full">
        <div className=" flex-1 flex flex-row justify-between items-center mt-10 lg:mt-0">
          <div>
            <h1 className="text-lg font-semibold">
              Hey, I&apos;m Alfiansah Erik Sugiarto — a full stack dev.
            </h1>
            <h1 className="text-md font-semibold text-gray-500">
              Crafting Seamless Solutions in Cyberspace,
              <br />
              Bridging the World of Full Stack Web Development.
            </h1>
          </div>
          {!isMobile && (
            <div>
              <Image
                src={alfiansaherikgans}
                alt="Alfiansah Erik"
                className="w-24 h-24 rounded-full"
              />
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg mt-10 border-2 border-gray-200 relative lg:w-full lg:p-6">
          <h2 className="absolute -top-3 left-5 bg-white border-2 border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
            Projects
          </h2>
          <div className="py-4">
          <ProjectList isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsPage;
