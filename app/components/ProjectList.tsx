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
  name: string;
  description: string;
  categoryId: number;
  date: string;
  slug: string;
  icon: string; // e.g., 'faChartSimple'
}

const iconMapping: Record<string, any> = {
  faProjectDiagram,
  faFileCode,
  faCode,
  faChartSimple,
  // Add other icons here as needed
};

interface ProjectListProps {
  isLoggedIn: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ isLoggedIn }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className={`overflow-hidden max-h-64`}>
      <div className="overflow-y-auto max-h-64 no-scrollbar">
        <ul className="list-none p-0">
          {projects.map((project) => (
            <div>
              <li
                key={project.id}
                className="mb-2 group hover:bg-gray-100 rounded-md hover:border p-2"
              >
                <Link href={`/project/${project.slug}`}>
                  <div className="flex items-center w-full">
                    <Icon
                      icon={project.icon}
                      className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-500"
                    />
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
                      <h3 className="text-xs md:text-sm lg:text-md font-semibold text-gray-400 group-hover:text-gray-500 truncate">
                        {project.name}
                      </h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(project.date)}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <hr className="mt-2 mb-2 bg-gray-50" />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
