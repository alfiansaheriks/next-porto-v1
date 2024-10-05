'use client'
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
} from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation"; // Import usePathname hook

export function FloatingDockDemo() {
  const pathname = usePathname(); // Get the current pathname

  const links = [
    {
      title: "Home",
      icon: (
        <Icon icon="bi:house-door" className="h-full w-full text-gray-600 hover:text-gray-400" />
      ),
      href: "/",
    },
    {
      title: "Projects",
      icon: (
        <Icon icon="bi:grid-3x3-gap-fill" className="h-full w-full text-gray-600 hover:text-gray-400" />
      ),
      href: "/project",
    },
    {
      title: "Posts",
      icon: (
        <Icon icon="bi:file-earmark-text" className="h-full w-full text-gray-600 hover:text-gray-400" />
      ),
      href: "/posts",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/airmatamonyet",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/alfiansaheriks",
    },
  ];

  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links.map(link => ({
          ...link,
          isActive: pathname === link.href, // Set isActive based on current pathname
        }))}
      />
    </div>
  );
}