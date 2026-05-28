import type { Project } from "../types/project";
import axiosInstance from "./axios";

export const getProjects = async (search?: string, sort?: string) => {
  const response = await axiosInstance.get("/projects", {
    params: {
      search,
      sort,
    },
  });

  return response.data.data;
};

export const createProject = async (payload: Project) => {
  const response = await axiosInstance.post("/projects", payload);

  return response.data.data;
};

export const updateProject = async (id: string, payload: Project) => {
  const response = await axiosInstance.put(`/projects/${id}`, payload);

  return response.data.data;
};

export const deleteProject = async (id: string) => {
  const response = await axiosInstance.delete(`/projects/${id}`);

  return response.data.data;
};
