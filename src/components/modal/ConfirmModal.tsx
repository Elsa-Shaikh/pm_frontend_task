import { X } from "lucide-react";

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmModal = ({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  onClose,
  onConfirm,
  loading,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="card w-full max-w-md rounded-3xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-6 text-[var(--text-muted)]">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-[var(--danger)] px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
