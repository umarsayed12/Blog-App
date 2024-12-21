import React from "react";

const Button = ({
  children,
  type = "button",
  textColor = "text-white",
  bgColor = "bg-violet-600",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${className} ${textColor} ${bgColor}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
