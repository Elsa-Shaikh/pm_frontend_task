interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className, disabled, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`rounded-2xl px-5 py-3 font-medium text-white transition
            ${
              disabled
                ? "cursor-not-allowed bg-[var(--primary)] opacity-50"
                : "bg-[var(--primary)] hover:bg-[var(--primary-hover)] cursor-pointer"
            } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
