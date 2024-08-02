import tw from "tailwind-styled-components";

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const BaseButton = tw.button`
  py-2
  px-4
  font-semibold
  rounded-lg
  shadow-md
  focus:outline-none
  focus:ring-2
  focus:ring-opacity-75
`;

const PrimaryButton = tw(BaseButton)<ButtonProps>`
  bg-blue-500
  text-white
  hover:bg-blue-700
  focus:ring-blue-400
`;

const SecondaryButton = tw(BaseButton)<ButtonProps>`
  bg-gray-500
  text-white
  hover:bg-gray-700
  focus:ring-gray-400
`;

const Button: React.FC<ButtonProps> = ({ primary, secondary, children, onClick }) => {
  if (primary) {
    return <PrimaryButton onClick={onClick}>{children}</PrimaryButton>;
  }

  if (secondary) {
    return <SecondaryButton onClick={onClick}>{children}</SecondaryButton>;
  }

  return <BaseButton onClick={onClick}>{children}</BaseButton>;
};

export default Button;
