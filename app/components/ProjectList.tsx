import React from "react";

const projects = [
  {
    name: "Ajakan.me Revamp Landing Page",
    date: "06-08-2024",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="text-gray-500 mr-2"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m12.146 8.583l-1.3-2.09a1.046 1.046 0 0 0-1.786.017l-5.91 9.908A1.046 1.046 0 0 0 4.047 18H7.96m12.083 0c.743 0 1.201-.843.82-1.505l-4.044-7.013a.936.936 0 0 0-1.638 0l-4.043 7.013c-.382.662.076 1.505.819 1.505z"
        />
      </svg>
    ),
  },
  {
    name: "Smart Contract for Batik Supply Chain",
    date: "27-06-2024",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="text-gray-500 mr-2"
      >
        <path
          fill="currentColor"
          d="M2 2h7v2.5h6V2h7v7h-2.5v6H22v7h-7v-2.5H9V22H2v-7h2.5V9H2zm5 5V4H4v3zm-.5 2v6H9v2.5h6V15h2.5V9H15V6.5H9V9zM17 17v3h3v-3zM7 17H4v3h3zM17 4v3h3V4z"
        />
      </svg>
    ),
  },
  {
    name: "MERN Blog",
    date: "21-06-2024",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 32 32"
        className="text-gray-500 mr-2"
      >
        <path
          fill="currentColor"
          d="M4 24h10v2H4zm0-6h10v2H4zm22-4H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M6 6v6h20V6zm20 22h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2m-6-8v6h6v-6z"
        />
      </svg>
    ),
  },
  {
    name: "Hijaiyah Learning Website using Artificial Intelligence",
    date: "04-05-2024",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 48 48"
        className="text-gray-500 mr-2"
      >
        <path
          fill="currentColor"
          d="M34 6c-1.368 4.944-3.13 6.633-8 8c4.87 1.367 6.632 3.056 8 8c1.368-4.944 3.13-6.633 8-8c-4.87-1.367-6.632-3.056-8-8m-14 8c-2.395 8.651-5.476 11.608-14 14c8.524 2.392 11.605 5.349 14 14c2.395-8.651 5.476-11.608 14-14c-8.524-2.392-11.605-5.349-14-14"
        />
      </svg>
    ),
  },
  {
    name: "Student Data Management at SD Muhammadiyah Tamantirto.",
    date: "28-09-2023",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="text-gray-500 mr-2"
      >
        <path
          fill="#000000"
          d="M2.75 17.75q-.325-.325-.325-.75t.325-.75l5.325-5.325q.575-.575 1.425-.575t1.425.575L13.5 13.5l6.4-7.225q.275-.325.713-.325t.737.3q.275.275.287.662t-.262.688L14.9 14.9q-.575.65-1.425.688T12 15l-2.5-2.5l-5.25 5.25q-.325.325-.75.325t-.75-.325"
        />
      </svg>
    ),
  },
  {
    name: "BSI Batam Handover Document Report",
    date: "15-03-2023",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="text-gray-500 mr-2"
      >
        <path
          fill="#000000"
          d="M2.75 17.75q-.325-.325-.325-.75t.325-.75l5.325-5.325q.575-.575 1.425-.575t1.425.575L13.5 13.5l6.4-7.225q.275-.325.713-.325t.737.3q.275.275.287.662t-.262.688L14.9 14.9q-.575.65-1.425.688T12 15l-2.5-2.5l-5.25 5.25q-.325.325-.75.325t-.75-.325"
        />
      </svg>
    ),
  },
  {
    name: "Daily Marketing Report at BSI Batam",
    date: "15-02-2023",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="text-gray-500 mr-2"
      >
        <path
          fill="#000000"
          d="M2.75 17.75q-.325-.325-.325-.75t.325-.75l5.325-5.325q.575-.575 1.425-.575t1.425.575L13.5 13.5l6.4-7.225q.275-.325.713-.325t.737.3q.275.275.287.662t-.262.688L14.9 14.9q-.575.65-1.425.688T12 15l-2.5-2.5l-5.25 5.25q-.325.325-.75.325t-.75-.325"
        />
      </svg>
    ),
  },
];

const ProjectList = () => {
  return (
    <div className="overflow-hidden max-h-64">
  <div className="overflow-y-auto max-h-64 scrollbar-hidden">
    <ul className="list-none p-0">
      {projects.map((project, index) => (
        <li
          key={index}
          className="mb-2 hover:bg-gray-100 rounded-md hover:border p-2 flex items-center"
        >
          {project.icon}
          <div className="flex justify-between w-full">
            <h3 className="text-xs font-semibold text-gray-500">
              {project.name}
            </h3>
            <span className="text-xs text-gray-400 whitespace-nowrap">{project.date}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
};

export default ProjectList;
