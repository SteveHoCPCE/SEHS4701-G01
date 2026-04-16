// src/components/ui/Button.jsx
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-3 rounded-2xl font-medium transition-all active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Also export as named for safety
export { Button };
