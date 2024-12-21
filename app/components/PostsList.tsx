import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faFileCode,
  faCode,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@nextui-org/skeleton";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust path accordingly
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  createdAt: string;
  slug: string;
  icon: string;
}

interface ProjectListProps {
  isLoggedIn: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ isLoggedIn }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [posts, setPosts] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (error) {
    return <p>{error}</p>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  const handleEdit = (id: number) => {
    // Handle edit logic here
    console.log(`Edit project with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Handle delete logic here
    console.log(`Delete project with id: ${id}`);
  };

  return (
    <div className="overflow-hidden max-h-64">
      <div className="overflow-y-auto max-h-64 no-scrollbar">
        <ul className="list-none p-0">
          {posts.map((post) => (
            <li
              key={post.id}
              className="mb-2 group hover:bg-gray-100 rounded-md hover:border p-2"
            >
              <Link href={`/posts/${post.slug}`}>
                <div className="flex items-center w-full">
                  <Icon
                    icon={post.icon}
                    className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-500"
                  />
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
                    <h3 className="text-xs font-semibold text-gray-400 group-hover:text-gray-500">
                      {post.title}
                    </h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(post.createdAt)}
                      </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
