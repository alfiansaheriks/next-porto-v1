import ProjectForm from "./form";
export default async function CreateProjectPage() {
  return (
    <div className="container mx-auto z-10">
      <h1 className="flex text-3xl font-semibold justify-center mb-4">Create Project</h1>
      <ProjectForm />
    </div>
  );
}
