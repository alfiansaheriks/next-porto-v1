"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion
import ProjectList from "./components/ProjectList";
import ActivityList from "./components/ActivityList";
import PostsList from "./components/PostsList";
import alfiansaherikgans from "./assets/erikganz.jpg";
import { getCookie, deleteCookie } from "@/utils/cookie";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Meteors } from "@/components/ui/meteors";
import Playlist from "./components/NowPlaying";
import { GrTools } from "react-icons/gr";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCookie("token");
      if (token) {
        setIsLoggedIn(true);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const detectDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);

    return () => {
      window.removeEventListener("resize", detectDevice);
    };
  }, []);

  const handleLogout = async () => {
    await deleteCookie("token");
    setIsLoggedIn(false);
    router.push("/");
  };

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
        <div className="flex-1 flex flex-row justify-between items-center mt-10 lg:mt-0 w-full">
          {/* <Meteors number={20} className="absolute top-1/2 left-1/2" /> */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Awal fade dan dari kiri
            animate={{ opacity: 1, x: 0 }} // Akhir
            transition={{ duration: 1 }} // Durasi animasi
          >
            <h1 className="lg:text-[30px] font-bold">
              Hey, I&apos;m Alfiansah Erik Sugiarto — a full stack dev.
            </h1>
            <h1 className="text-[16px] font-medium text-gray-500">
              Crafting Seamless Solutions in Cyberspace,
              <br />
              Bridging the World of Full Stack Web Development.
            </h1>
          </motion.div>

          {/* Animasi untuk foto */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 50 }} // Awal fade dan dari kanan
              animate={{ opacity: 1, x: 0 }} // Akhir
              transition={{ duration: 1 }} // Durasi animasi
            >
              <Image
                src={alfiansaherikgans}
                alt="Alfiansah Erik"
                className="w-24 h-24 rounded-full"
              />
            </motion.div>
          )}
        </div>
        <section id="all-section" className="justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Awal fade dan dari bawah
              animate={{ opacity: 1, y: 0 }} // Akhir
              transition={{ duration: 1 }} // Durasi animasi
            >
              <div className="bg-white rounded-lg px-4 py-4 mt-10 border border-gray-200 relative ">
                <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-semibold mb-4">
                  Projects
                </h2>
                <div className="max-h-64 overflow-y-auto pr-2">
                  <ProjectList isLoggedIn={isLoggedIn} />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Awal fade dan dari bawah
              animate={{ opacity: 1, y: 0 }} // Akhir
              transition={{ duration: 1 }} // Durasi animasi
            >
              <div className="bg-white rounded-lg px-4 py-4 mt-10 border border-gray-200 relative lg:ml-4">
                <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-semibold mb-4">
                  Activity
                </h2>
                <div className="max-h-64 overflow-y-auto pr-2">
                  <ActivityList isLoggedIn={isLoggedIn} />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mt-10 w-full">
            {/* Music Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Awal fade dan dari bawah
              animate={{ opacity: 1, y: 0 }} // Akhir
              transition={{ duration: 1 }} // Durasi animasi
              whileHover={{ scale: 1.02 }}
              className="w-full"
            >
              <div className="bg-white rounded-2xl border border-gray-200 relative flex-1 p-6 min-h-[143px] w-full md:w-full lg:w-full xl:w-full">
                <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-semibold shadow-sm">
                  Music
                </h2>
                <div className="max-h-64 overflow-y-auto pr-2 h-full">
                  <Playlist />
                </div>
              </div>
            </motion.div>

            {/* Under Construction Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="w-full"
            >
              <div className="bg-white rounded-2xl border border-gray-200 relative flex-1 p-6 min-h-[143px] w-full md:w-full lg:w-full xl:w-full mt-5 md:mt-0 lg:mt-0 xl:mt-0">
                <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-semibold shadow-sm">
                  Under Construction
                </h2>
                <div className="max-h-64 overflow-y-auto pr-2 h-full flex flex-col items-center justify-center text-center gap-2">
                  <GrTools className="text-gray-400" size={28} />
                  <p className="text-primary font-semibold text-sm italic">
                    This section is under construction
                  </p>
                  <p className="text-gray-500 text-xs">
                    Please check back later
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
