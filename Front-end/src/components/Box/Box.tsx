// Box.tsx
import React, { ReactNode } from "react";
import tw from "tailwind-styled-components";

interface BoxProps {
  children: ReactNode;
  className?: string;
  padding?: string;
  margin?: string;
  bgColor?: string;
  textColor?: string;
  borderRadius?: string;
  border?: string;
  shadow?: string;
  height?: string;
  width?: string;
}

const StyledBox = tw.div<BoxProps>`
  ${(props) => props.padding || "px-16 py-4"}
  ${(props) => props.margin || "mx-auto "}
  ${(props) => props.bgColor || "bg-white"}
  ${(props) => props.textColor || "text-black"}
  ${(props) => props.borderRadius || "rounded-lg"}
  ${(props) => props.border || ""}
  ${(props) => props.shadow || "shadow-lg"}
  ${(props) => props.height || "h-full"}
  ${(props) => props.width || "max-w-[800px] "}
`;

const Box: React.FC<BoxProps> = ({ children, className = "", ...rest }) => {
  return (
    <StyledBox className={className} {...rest}>
      {children}
    </StyledBox>
  );
};

export default Box;
