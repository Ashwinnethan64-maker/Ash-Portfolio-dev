import { forwardRef, ReactNode } from "react";


import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";


interface CyberButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}



export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    const baseStyles = "relative font-mono font-bold tracking-wider uppercase transition-all duration-200 overflow-hidden group";
    
    const variants = {
      primary: "bg-primary/10 text-primary border border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]",
      outline: "bg-transparent text-foreground border border-white/20 hover:border-primary hover:text-primary hover:bg-primary/5",
      ghost: "bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/5",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        {variant === "primary" && (
          <div className="absolute inset-0 bg-primary/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
        )}
      </motion.button>
    );
  }
);

CyberButton.displayName = "CyberButton";
