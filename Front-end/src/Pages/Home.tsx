// src/components/Home.tsx
import React from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "../context/ThemeContext";
import Typography from "../components/Typography";
import Fields from "../components/Fields/Fields";

const HomeContainer = tw.div`
  flex items-center justify-center my-4 border-sky-500
`;

const TextCenter = tw.div`
  text-center
`;

const Button = tw.button`
  mt-4 px-4 py-2 bg-blue-500 text-white rounded
`;

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <HomeContainer className={theme}>
      <TextCenter>
        {/* <Typography size="text-2xl" variant="h2" color="text-accent">
          Hello, React with TypeScript!
        </Typography> */}
        {/* <Fields type="text" /> */}
        {/* <Button onClick={toggleTheme}>Toggle Theme</Button> */}
      </TextCenter>
    </HomeContainer>
  );
};

export default Home;
