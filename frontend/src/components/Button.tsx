import React from "react";

interface ButtonProps {
  variant: "primary" | "outline";
  size?: "small" | "medium" | "large";
  width?: "auto" | "full" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size = "medium",
  width = "auto",
  children,
  onClick,
  className,
  type,
}) => {
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3",
    large: "px-8 py-4 text-lg",
  }[size];

  const widthClasses = {
    auto: "",
    full: "w-full",
    large: "w-lg",
  }[width];

  const baseClasses =
    `rounded-lg font-semibold transition-fast cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${sizeClasses} ${widthClasses}`.trim();
  const variantClasses =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md"
      : "border-2 border-accent text-accent hover:bg-accent hover:text-white bg-white";
  const classes = `${baseClasses} ${variantClasses} ${className}`.trim();

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
