"use client";

import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React, { useState, useEffect, useCallback } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@/components/ui/button";

interface Activity {
  id: number;
  name: string;
  date: string;
  icon: string;
}
interface ActivityListProps {
  isLoggedIn: boolean;
}

const ActivityList: React.FC<ActivityListProps> = ({ isLoggedIn }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activities, setActivites] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/activities`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }
      const data = await response.json();
      setActivites(data || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Failed to fetch activities");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  const handleEdit = (id: number) => {
    console.log(`Edit project with ID ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete project with ID ${id}`);
  };

  if (loading) {
    return (
      <ul className="list-none p-0">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="group relative pb-3">
            <div className="relative flex items-center bg-slate-100 z-10 rounded-md">
              <Skeleton className="h-8 w-8 rounded-md" />
              <div className="flex justify-between items-center w-full ml-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className="list-none p-0 no-scrollbar">
      {activities.map((activity, index) => (
        <li key={index} className="group relative pb-3">
          {index < activities.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-100 dark:bg-gray-900 z-0"
            ></span>
          )}
          <a href="#" className="relative flex items-center bg-white z-10">
            <div className="text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-white h-8 w-8 rounded-md flex items-center justify-center ring-2 ring-white dark:ring-gray-950 border-2 border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950 z-20 default-transition group-hover:border-gray-200 dark:group-hover:border-gray-800">
              <Icon
                icon={activity.icon}
                className="text-xl text-gray-400 w-4 h-4 group-hover:text-gray-500"
              />{" "}
            </div>
            <div className="flex justify-between items-center w-full space-x-4">
              <span className="ml-2 text-xs font-semibold text-gray-400 group-hover:text-gray-500 items-center">
                {activity.name}
              </span>
                <span className="text-xs text-gray-400">
                {formatDate(activity.date)}
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;