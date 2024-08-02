// src/App.tsx
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./Pages/Home";
import Form from "./Pages/ShowForms/ShowForms";
import ShowResults from "./Pages/ShowResults/ShowResults";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app ">
        {/* <Home /> */}
        {/* <Form /> */}
        <ShowResults />
      </div>
    </ThemeProvider>
  );
};

export default App;
