'use client';

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faFileCode, faCode, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { Skeleton } from "@nextui-org/skeleton";
import Link from "next/link";

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

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3333/projects', {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      // console.log(data);
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
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
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="overflow-hidden max-h-64">
      <div className="overflow-y-auto max-h-64 scrollbar-hidden">
        <ul className="list-none p-0">
          {projects.map((project) => (
            <Link href={`/project/${project.slug}`} key={project.id}>
            <li // Changed to project.id for a unique key
              className="mb-2 hover:bg-gray-100 rounded-md hover:border p-2 flex items-center"
            >
              {/* Dynamically render the icon based on the project.icon string */}
              
              <FontAwesomeIcon icon={iconMapping[project.icon]} className="h-4 w-4 mr-2" />
              <div className="flex justify-between w-full">
                <h3 className="text-xs font-semibold text-gray-500">
                  {project.name}
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatDate(project.date)}
                </span>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;