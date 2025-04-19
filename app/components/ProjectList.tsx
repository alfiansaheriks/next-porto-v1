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
  github?: string;
}

const iconMapping: Record<string, any> = {
  faProjectDiagram,
  faFileCode,
  faCode,
  faChartSimple,
};

interface ProjectListProps {
  isLoggedIn: boolean;
}

const projectData = [
  {
    id: 1,
    name: "MovieFlix",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    github: "https://github.com/alfiansaheriks/movieflix",
    icon: "material-symbols:mobile-hand-outline-rounded",
  },
  {
    id: 1,
    name: "Vet Petshop API",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    github: "https://github.com/alfiansaheriks/vet-pet-shop",
    icon: "material-symbols:pet-supplies-outline",
  },
  {
    id: 1,
    name: "LessGoo API (Online Transportation App)",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    github: "",
    icon: "material-symbols:transportation-outline-rounded",
  },
  {
    id: 1,
    name: "Akademik UMBB",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    icon: "material-symbols:insert-chart-outline-rounded",
  },
  {
    id: 1,
    name: "Akademik UMB",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    icon: "material-symbols:insert-chart-outline-rounded",
  },
  {
    id: 1,
    name: "Akademik UMAD Palembang",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    icon: "material-symbols:insert-chart-outline-rounded",
  },
  {
    id: 1,
    name: "Akademik UMPRI",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    icon: "material-symbols:insert-chart-outline-rounded",
  },
  {
    id: 1,
    name: "BSI Monitoring App",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    icon: "material-symbols:bar-chart-rounded",
  },
  {
    id: 1,
    name: "Batik Supply Chain Smart Contract",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    icon: "hugeicons:blockchain-02",
  },
  {
    id: 1,
    name: "Ajakan Revamp",
    description: "Description of Project 1",
    categoryId: 1,
    date: "2023-10-01",
    slug: "project-1",
    github:"https://github.com/alfiansaheriks/AjakanRevamp",
    icon: "tabler:brand-nuxt",
  },
  {
    id: 3,
    name: "Hijaiyah learning website using Artificial Intelligence",
    description: "Description of Project 3",
    categoryId: 3,
    date: "2024-04-24",
    slug: "project-3",
    icon: "streamline:artificial-intelligence-spark",
  },
  {
    id: 2,
    name: "Customer Document Report for BSI Batam Center",
    description: "Description of Project 2",
    categoryId: 2,
    date: "2023-10-02",
    slug: "project-2",
    icon: "simple-icons:civicrm",
  },
  {
    id: 4,
    name: "Website-based information system for managing student data at SD Muhammadiyah Tamantirto",
    description: "This project is a project carried out for the capstone project",
    categoryId: 4,
    date: "2023-10-28",
    slug: "project-4",
    icon: "material-symbols:auto-graph-rounded",
  },
];

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

  // useEffect(() => {
  //   fetchProjects();
  // }, [fetchProjects]);

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
          {projectData.map((project) => (
            <div key={project.id}>
              <li
                key={project.id}
                className="mb-2 group hover:bg-gray-100 rounded-md hover:border p-2"
              >
                <Link href={project.github || "#"} target="_blank">
                  <div className="flex items-center w-full">
                    <Icon
                      icon={project.icon}
                      className="h-5 w-5  mr-2 text-gray-400 group-hover:text-gray-500"
                    />
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
                      <h3 className="text-xs md:text-sm lg:text-sm font-medium text-gray-400 group-hover:text-gray-500 truncate">
                        {project.name}
                      </h3>
                      {/* <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(project.date)}
                      </span> */}
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
