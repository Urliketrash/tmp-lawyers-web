import * as React from "react";

/**
 * Props for the Button component.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gold";
  /** Size variant of the button */
  size?: "default" | "sm" | "lg" | "icon";
}

/**
 * Reusable Button component designed in accordance with shadcn/ui guidelines,
 * tailored for the dark gold theme.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tmp-gold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none";

    const variantStyles = {
      default: "bg-white text-black hover:bg-white/90 shadow",
      destructive: "bg-red-600 text-white hover:bg-red-500 shadow-sm",
      outline: "border border-white/10 bg-transparent text-gray-300 hover:bg-white/10 hover:text-white",
      secondary: "bg-white/10 text-white hover:bg-white/20",
      ghost: "text-gray-400 hover:bg-white/10 hover:text-white",
      link: "text-tmp-gold underline-offset-4 hover:underline normal-case tracking-normal font-normal",
      gold: "bg-tmp-gold text-black hover:bg-white",
    };

    const sizeStyles = {
      default: "h-10 px-6 py-2.5",
      sm: "h-8 rounded px-3 text-[10px]",
      lg: "h-12 rounded-md px-8 text-sm",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
