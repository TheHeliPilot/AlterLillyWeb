"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "default" | "elevated" | "bordered" | "glass";
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const variantStyles = {
  default: "bg-bg-mid",
  elevated: "bg-bg-mid shadow-xl shadow-black/20",
  bordered: "bg-bg-mid border border-border",
  glass: "bg-bg-mid/80 backdrop-blur-md border border-border/50",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "bordered",
      hover = false,
      glow = false,
      glowColor = "var(--maxine-orange)",
      padding = "md",
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={clsx(
          "rounded-lg overflow-hidden transition-all duration-300",
          variantStyles[variant],
          paddingStyles[padding],
          hover && "hover:border-maxine-orange cursor-pointer",
          className
        )}
        style={{
          ...style,
          ...(glow && {
            boxShadow: `0 0 20px ${glowColor}30, 0 0 40px ${glowColor}10`,
          }),
        }}
        whileHover={
          hover
            ? {
                y: -8,
                scale: 1.02,
                boxShadow: `0 10px 40px ${glowColor}20`,
              }
            : undefined
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Card Header
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={clsx("mb-4 pb-4 border-b border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Card Title
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
}

export function CardTitle({
  as: Tag = "h3",
  children,
  className,
  ...props
}: CardTitleProps) {
  return (
    <Tag
      className={clsx(
        "font-display text-xl text-text-cream tracking-wide",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Card Content
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({
  children,
  className,
  ...props
}: CardContentProps) {
  return (
    <div className={clsx("text-text-muted", className)} {...props}>
      {children}
    </div>
  );
}

// Card Footer
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({
  children,
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={clsx("mt-4 pt-4 border-t border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Card Image
interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
  className?: string;
}

export function CardImage({
  src,
  alt,
  aspectRatio = "video",
  className,
}: CardImageProps) {
  const aspectRatioStyles = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "",
  };

  return (
    <div
      className={clsx(
        "relative overflow-hidden -mx-6 -mt-6 mb-4",
        aspectRatioStyles[aspectRatio],
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}

export default Card;
