import React, { ReactNode } from "react";
import tw from "tailwind-styled-components";

interface BoxProps {
  title?: string;
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
  onSubmit?: () => void;
  onCancel?: () => void;
  buttonLabel?: string; // New prop for button label
  onButtonClick?: () => void; // New prop for button click handler
}

const StyledBox = tw.div<BoxProps>`
  ${(props) => props.padding || "px-8 py-4"}
  ${(props) => props.margin || "mx-auto"}
  ${(props) => props.bgColor || "bg-white"}
  ${(props) => props.textColor || "text-black"}
  ${(props) => props.borderRadius || "rounded-lg"}
  ${(props) => props.border || ""}
  ${(props) => props.shadow || "shadow-lg"}
  ${(props) => props.height || "h-full"}
  ${(props) => props.width || "max-w-[800px]"}
  flex flex-col
`;

const Title = tw.div`
  text-xl font-bold mb-2 text-center
`;

const Divider = tw.div`
  border-b-2 border-gray-200 mb-4
`;

const Body = tw.div`
  flex-grow
`;

const ButtonContainer = tw.div`
  flex justify-end mt-4
`;

const Button = tw.button`
  px-4 py-2 ml-2 rounded mr-4
`;

const Box: React.FC<BoxProps> = ({
  title,
  children,
  className = "",
  onSubmit,
  onCancel,
  buttonLabel,
  onButtonClick,
  ...rest
}) => {
  return (
    <div className="relative">
      {buttonLabel && onButtonClick && (
        <button
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onButtonClick}
        >
          {buttonLabel}
        </button>
      )}
      <StyledBox className={className} {...rest}>
        {title && (
          <>
            <Title>{title}</Title>
            <Divider />
          </>
        )}
        <Body>{children}</Body>
        <ButtonContainer>
          {onCancel && (
            <Button className="bg-gray-500 text-white" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onSubmit && (
            <Button className="bg-blue-500 text-white" onClick={onSubmit}>
              Submit
            </Button>
          )}
        </ButtonContainer>
      </StyledBox>
    </div>
  );
};

export default Box;
