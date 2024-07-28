import React from "react";

interface TypographyProps {
  size?: "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs" | "base";
  variant?: "h1" | "h2" | "h3" | "paragraph" | "span";
  color?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Typography = ({
  size = "3xl",
  variant = "h1",
  color = "black",
  className = "",
  onClick,
  children,
}: TypographyProps) => {
  const baseClass = `text-${size} text-${color} ${className}`;

  const tagMapping = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    paragraph: "p",
    span: "span",
  };

  const Tag = tagMapping[variant] || "p";

  return (
    <Tag className={baseClass} onClick={onClick}>
      {children}
    </Tag>
  );
  // return React.createElement(Tag, { className: baseClass, onClick }, children);
};

export default Typography;
