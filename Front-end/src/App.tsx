// src/App.tsx
import React from "react";
import { FormProvider } from "./context/FormContext";
import Home from "./Pages/Home";
import Form from "./Pages/ShowForms/ShowForms";
import CreateForms from "./Pages/CreateForm/CreateForms";
import { ControllProvider } from "./context/ControllerContext";
import SideBar from "./components/layout/SideBar";

const App: React.FC = () => {
  return (
    <FormProvider>
      <ControllProvider>
        <div className="flex gap-8">
 
          {/* <Home /> */}
          <CreateForms />
          {/* <Form/> */}
          <SideBar/>
          {/* <Form/> */}
        </div>
      </ControllProvider>
    </FormProvider>
  );
};

export default App;
