interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

const Input = ({ label, required, error, ...props }: Props) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-[var(--danger)]">*</span>}
      </label>

      <input
        {...props}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 transition 
        focus:border-[var(--primary)]"
      />

      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
    </div>
  );
};

export default Input;
