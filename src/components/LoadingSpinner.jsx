import React from "react";

function LoadingSpinner({ size = "medium" }) {
  const sizes = {
    small: "h-8 w-8 border-2",
    medium: "h-12 w-12 border-4",
    large: "h-16 w-16 border-4",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        data-testid="loading-spinner" // This is the correct way to add the comment.
        className={`animate-spin rounded-full border-t-transparent ${sizes[size]} border-blue-500`}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
