// src/components/ui/Input.jsx
export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm text-gray-400">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#1a1a24] border border-gray-700 focus:border-cyan-400 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none"
        {...props}
      />
    </div>
  );
}
