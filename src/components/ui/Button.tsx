"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Icon } from "./Icons";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "cta";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  glow?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-maxine-orange text-bg-dark
    hover:bg-[#d66840]
    focus-visible:ring-2 focus-visible:ring-maxine-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark
  `,
  secondary: `
    bg-earth-brown text-snow-white
    hover:bg-[#7a6449]
    focus-visible:ring-2 focus-visible:ring-earth-brown focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark
  `,
  outline: `
    bg-transparent text-text-cream
    border-2 border-border
    hover:border-maxine-orange hover:text-maxine-orange
    focus-visible:ring-2 focus-visible:ring-maxine-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark
  `,
  ghost: `
    bg-transparent text-text-muted
    hover:text-text-cream hover:bg-white/5
    focus-visible:ring-2 focus-visible:ring-text-cream focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark
  `,
  cta: `
    bg-gradient-to-r from-maxine-orange to-[#d66840] text-bg-dark
    hover:from-[#f08058] hover:to-maxine-orange
    focus-visible:ring-2 focus-visible:ring-maxine-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark
    font-semibold
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      loading = false,
      fullWidth = false,
      glow = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-lg font-ui font-medium transition-all duration-300",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          glow && variant === "cta" && "cta-glow",
          (disabled || loading) && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        {...props}
      >
        {loading ? (
          <>
            <Icon name="spinner" size={20} className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && icon}
            <span>{children}</span>
            {icon && iconPosition === "right" && icon}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

// Link styled as button
interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  glow?: boolean;
  external?: boolean;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-disabled"?: boolean;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  glow = false,
  external = false,
  children,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-ui font-medium transition-all duration-300",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        glow && variant === "cta" && "cta-glow",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={props["aria-label"]}
      aria-disabled={props["aria-disabled"]}
    >
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
      {external && <Icon name="externalLink" size={16} />}
    </motion.a>
  );
}

export default Button;
