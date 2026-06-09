import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Reusable Input component based on shadcn/ui styles.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`flex h-12 w-full rounded-md border border-white/10 bg-tmp-black px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-tmp-gold transition-colors disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-tmp-gold ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
