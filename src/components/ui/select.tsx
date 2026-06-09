import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Reusable Select dropdown component styled in the spirit of shadcn/ui.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={`flex h-12 w-full rounded-md border border-white/10 bg-tmp-black px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:border-tmp-gold transition-colors disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <i className="fas fa-chevron-down text-xs"></i>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
