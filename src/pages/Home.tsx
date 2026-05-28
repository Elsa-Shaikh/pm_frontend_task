import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import toast from "react-hot-toast";
import ProjectSearch from "../components/project/ProjectSearch";
import ProjectFilters from "../components/project/ProjectFilters";
import ProjectGrid from "../components/project/ProjectGrid";

import ProjectModal from "../components/modal/ProjectModal";

import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../hooks/useProjects";

import { Plus } from "lucide-react";
import type { Project } from "../types/project";
import ConfirmModal from "../components/modal/ConfirmModal";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useProjects(debouncedSearch, sort);

  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const handleCreateProject = async (values: Project) => {
    await createMutation.mutateAsync(values);
    toast.success("Project created successfully");
    setOpenModal(false);
  };

  const handleUpdateProject = async (values: Project) => {
    await updateMutation.mutateAsync({
      id: selectedProject?._id ?? "",
      payload: values,
    });

    setSelectedProject(null);
    toast.success("Project updated successfully");

    setOpenModal(false);
  };

  const handleDeleteProject = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    toast.success("Project deleted successfully");
    setConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <>
      <main className="min-h-screen bg-[var(--bg)] transition-theme">
        <Navbar />

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="mb-3 text-4xl font-bold">Project Dashboard</h2>

              <p className="max-w-2xl text-[var(--text-muted)]">
                Track tasks, manage workflows, and stay productive.
              </p>
            </div>

            <Button
              onClick={() => {
                setSelectedProject(null);
                setOpenModal(true);
              }}
              className="flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Project
            </Button>
          </div>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <ProjectSearch value={search} onChange={setSearch} />
            <ProjectFilters sort={sort} setSort={setSort} />
          </div>

          {isLoading ? (
            <Loader />
          ) : data?.length ? (
            <ProjectGrid
              projects={data}
              onEdit={(project) => {
                setSelectedProject(project);
                setOpenModal(true);
              }}
              // onDelete={handleDeleteProject}
              onDelete={(id) => {
                setDeleteId(id);
                setConfirmOpen(true);
              }}
            />
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
      <ProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
        defaultValues={selectedProject}
        loading={createMutation.isPending || updateMutation.isPending}
      />
      <ConfirmModal
        open={confirmOpen}
        title="Delete Project"
        message="This action cannot be undone. Do you really want to delete this project?"
        onClose={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
        onConfirm={handleDeleteProject}
        loading={deleteMutation.isPending}
      />
    </>
  );
};

export default Home;
