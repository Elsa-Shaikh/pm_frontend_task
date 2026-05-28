import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];

  onEdit: (project: Project) => void;

  onDelete: (id: string) => void;
}

const ProjectGrid = ({ projects, onEdit, onDelete }: Props) => {
  return (
    // <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    <div className="grid w-full min-w-0 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project._id!)}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
