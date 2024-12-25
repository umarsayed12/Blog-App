import React from "react";

const Button = (
  {
    children,
    type = "button",
    textColor = "text-white",
    bgColor = "bg-violet-600",
    className = "",
    ...props
  },
  ref
) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${className} ${textColor} ${bgColor}`}
      type={type}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};

export default React.forwardRef(Button);
