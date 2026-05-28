import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import {
  projectSchema,
  type ProjectFormData,
} from "../../validations/project.schema";
import { STATUS_OPTIONS, type Project } from "../../types/project";
import { useEffect } from "react";
import CustomSelect from "../common/Select";
import DatePicker from "../common/DatePicker";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  defaultValues?: Partial<Project> | null;
  loading?: boolean;
}

const ProjectModal = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
  loading,
}: Props) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues || {
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(
        {
          title: defaultValues.title || "",
          description: defaultValues.description || "",
          dueDate: defaultValues.dueDate
            ? new Date(defaultValues.dueDate).toISOString().split("T")[0]
            : "",
          status: defaultValues.status || "Pending",
        },
        {
          keepDirty: false,
          keepTouched: false,
        },
      );
    } else {
      reset({
        title: "",
        description: "",
        dueDate: "",
        status: "Pending",
      });
    }
  }, [defaultValues, reset]);
  const handleClose = () => {
    onClose();
  };
  if (!open) return null;
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

  const minDate = today.toISOString().split("T")[0];

  const isFormValid = isValid || Object.keys(errors).length === 0;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="card max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {defaultValues ? "Edit Project" : "Add Project"}
          </h2>

          <button
            onClick={handleClose}
            className="text-[var(--text-muted)] hover:text-[var(--text)] transition cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                label="Project Title"
                placeholder="Enter title"
                error={errors.title?.message}
                required={true}
                {...field}
              />
            )}
          />
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Due Date"
                value={field.value}
                onChange={field.onChange}
                min={minDate}
                error={errors.dueDate?.message}
                required
              />
            )}
          />
          {defaultValues && (
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <CustomSelect
                  label="Status"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  options={STATUS_OPTIONS}
                  error={errors.status?.message}
                />
              )}
            />
          )}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                label="Description"
                placeholder="Enter description"
                error={errors.description?.message}
                required={true}
                {...field}
              />
            )}
          />
          <Button disabled={loading || !isFormValid} className="w-full">
            {loading
              ? "Please wait..."
              : defaultValues
                ? "Edit Project"
                : "Add Project"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
