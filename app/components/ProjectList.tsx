import React, { useEffect, useState } from "react";
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3333/projects", {
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
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden max-h-64">
        <div className="overflow-y-auto max-h-64 scrollbar-hidden">
          <ul className="list-none p-0">
            {Array.from({ length: 5 }).map((_, index) => (
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
    );
  }

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
          {projects.map((project) => (
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
                  <div className="flex justify-between items-center w-full">
                    <h3 className="text-xs font-semibold text-gray-400 group-hover:text-gray-500">
                      {project.name}
                    </h3>
                    {!isLoggedIn && (
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(project.date)}
                      </span>
                    )}
                    {isLoggedIn && (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant={"outline"}
                            className="ml-2 focus:outline-none shadow-none border-none bg-transparent hover:bg-transparent"
                          >
                            <Icon
                              icon="mdi:dots-vertical"
                              className="h-5 w-5 text-gray-500"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEdit(project.id)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(project.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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
