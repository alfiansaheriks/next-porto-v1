"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProjectList from "./components/ProjectList";
import ActivityList from "./components/ActivityList";
import PostsList from "./components/PostsList";
import alfiansaherikgans from "./assets/erikganz.jpg";
import { getCookie, deleteCookie, setCookie } from "@/utils/cookie";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";


export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleCategoryChange = () => {
    router.push("/category");
  };

  const handleProjectButton = () => {
    router.push("/panel/project");
  };

  const handleActivityButton = () => {
    router.push("/panel/activity");
  };

  const handlePostsButton = () => {
    router.push("/panel/posts");
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCookie("token"); // Ganti "token" dengan nama cookie Anda
      if (token) {
        setIsLoggedIn(true);
      }
    };
    fetchToken();
  }, []);

  const handleLogout = async () => {
    await deleteCookie("token"); // Ganti "token" dengan nama cookie Anda
    setIsLoggedIn(false);
    router.push("/"); // Sesuaikan path jika diperlukan
  };

  useEffect(() => {
    const detectDevice = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    detectDevice(); // Initial check

    window.addEventListener("resize", detectDevice); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", detectDevice); // Clean up event listener on unmount
    };
  }, []);


  return (
    <>
      <div className="flex flex-col h-full mx-auto w-full">
        {isLoggedIn && (
          <div className="flex justify-end mr-4 mb-4">
            <Button variant={"outline"} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
        <div className="flex-1 flex flex-row justify-between items-center mt-10 lg:mt-0">
          <div>
            <h1 className="lg:text-lg font-semibold">
              Hey, I&apos;m Alfiansah Erik Sugiarto — a full stack dev.
            </h1>
            <h1 className="text-md font-semibold text-gray-500">
              Crafting Seamless Solutions in Cyberspace,
              <br />
              Bridging the World of Full Stack Web Development.
            </h1>
          </div>
          <div>
            {!isMobile && (
              <Image
                src={alfiansaherikgans}
                alt="Alfiansah Erik"
                className="w-24 h-24 rounded-full"
              />
            )}
          </div>
        </div>
        <section id="all-section" className="justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-white rounded-lg px-4 py-4 mt-10 border border-gray-200 relative lg:min-w-[450px]">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                Projects
              </h2>
              <ProjectList isLoggedIn={isLoggedIn} />
              {isLoggedIn && (
                <div className="flex justify-end mt-2 gap-2">
                  <Button variant={"outline"} onClick={handleProjectButton}>
                    <Icon
                      icon="material-symbols:manage-history-rounded"
                      className=""
                    />
                  </Button>
                  <Button variant={"outline"} onClick={handleCategoryChange}>
                    <Icon
                      icon="material-symbols:category-outline-rounded"
                      className=""
                    />
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg px-4 py-4 mt-10 border border-gray-200 relative lg:min-w-[200px] lg:ml-16">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                Activity
              </h2>
              <ActivityList isLoggedIn={isLoggedIn} />
              {isLoggedIn && (
                <div className="flex justify-end mt-2">
                  <Button onClick={handleActivityButton} variant={"outline"}>
                    <Icon icon="material-symbols:manage-history-rounded" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg mt-10 border border-gray-200 relative lg:w-full px-4 py-4 lg:p-6">
            <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
              Posts
            </h2>
            <PostsList isLoggedIn={isLoggedIn} />
            {isLoggedIn && (
              <div className="flex justify-end mt-2">
                <Button onClick={handlePostsButton} variant={"outline"}>
                  <Icon icon="material-symbols:manage-history-rounded" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
