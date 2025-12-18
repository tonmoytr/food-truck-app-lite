
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "px-6 py-3 rounded-full font-sans font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    // Default: Nature Green
    primary: "bg-nature-400 text-white hover:bg-nature-300 shadow-md",

    // Secondary: Dark Green
    secondary: "bg-nature-500 text-white hover:bg-nature-400",

    // Outline: Transparent with border
    outline: "border-2 border-nature-300 text-nature-500 hover:bg-nature-100",
  };

  return (
    <button
      className={`${baseStyles} ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
