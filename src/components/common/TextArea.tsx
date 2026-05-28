interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
}

const TextArea = ({ label, required, error, ...props }: Props) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-[var(--danger)]">*</span>}
      </label>

      <textarea
        {...props}
        className="min-h-[120px] focus:border-[var(--primary)] resize-none w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3"
      />

      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
    </div>
  );
};

export default TextArea;
