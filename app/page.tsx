'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProjectList from "./components/ProjectList";
import ActivityList from "./components/ActivityList";
import NowPlaying from "./components/NowPlaying";
import alfiansaherikgans from "./assets/erikganz.jpg";
import { getCookie, deleteCookie } from "@/utils/cookie";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("token"); // Replace "token" with your cookie name
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    deleteCookie("token"); // Replace "token" with your cookie name
    setIsLoggedIn(false);
    // Optionally, redirect to the login page or home page
    router.push("/"); // Adjust the path as necessary
  };

  return (
    <>
      <div className="flex flex-col h-full mx-auto max-w-4xl pb-8">
      {isLoggedIn && (
            <div className="flex justify-end mr-4 mb-4">
              <Button variant={"outline"} onClick={handleLogout}>
                Logout
                </Button>
            </div>
          )}
        <div className="inter flex-1 flex flex-row justify-center items-center gap-72">
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
          <div>
            <Image
              src={alfiansaherikgans}
              alt="Alfiansah Erik"
              className="w-24 h-24 rounded-full"
            />
          </div>
        </div>
        <section id="all-section" className="justify-center items-center">
          <div className="grid grid-cols-2">
            <div className="bg-white rounded-lg px-4 py-4 mt-10 border border-gray-200 relative lg:min-w-[450px] ml-8">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                Projects
              </h2>
              <ProjectList isLoggedIn={isLoggedIn} />
              {isLoggedIn && (
                <div className="flex justify-end mt-2">
                  <Button variant={"outline"}>
                    <Icon icon="akar-icons:plus" className=""/>
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg px-4 py-4 mt-10 border border-gray-200 relative lg:min-w-[200px] ml-16">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                Activity
              </h2>
              <ActivityList isLoggedIn={isLoggedIn} />
              {isLoggedIn && (
                <div className="flex justify-end mt-2">
                <Button variant={"outline"}>
                  <Icon icon="akar-icons:plus" className=""/>
                </Button>
              </div>
              )}
            </div>
            <div className="bg-white rounded-lg p-6 mt-10 border border-gray-200 relative lg:min-w-[200px] ml-8">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                On Work
              </h2>
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className="text-gray-500 flex items-center justify-center mt-8"
                  >
                    <path
                      fill="currentColor"
                      d="M4.825 12.025L8.7 15.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T2.426 12t.063-.375t.212-.325l2.875-2.875l-3.5-3.5q-.3-.3-.3-.712t.3-.713t.713-.3t.712.3l17 17q.3.3.3.7t-.3.7t-.712.3t-.713-.3L7 9.85zm12.9 2.825q-.3-.3-.3-.712t.3-.713l1.45-1.45L15.3 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-2.175 2.175q-.3.3-.7.288t-.7-.313"
                    />
                  </svg>
                  <h1 className="text-sm text-center font-bold text-gray-500">
                    Not Working
                  </h1>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">
                  I&apos;m currently not working on any projects.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 mt-10 border border-gray-200 relative lg:min-w-[200px] lg:min-h-[100px] ml-8">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                Playlist
              </h2>
              <ul className="list-none p-0">
                <li className="hover:bg-gray-100 rounded-xl">
                  <h3 className="text-xs font-semibold text-gray-500">
                    <NowPlaying />
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}