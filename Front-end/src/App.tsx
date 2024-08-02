// src/App.tsx
import React from "react";
import { FormProvider } from "./context/FormContext";
import Home from "./Pages/Home";
import Form from "./Pages/ShowForms/ShowForms";
import CreateForms from "./Pages/CreateForm/CreateForms";
import { ControllProvider } from "./context/ControllerContext";
import SideBar from "./components/layout/SideBar";
import UserForm from "./Pages/UserForm/UserForm";
const App: React.FC = () => {
  return (
    <FormProvider>
      <ControllProvider>
        <div className="flex gap-8">
          {/* <Home /> */}
          <UserForm />
          
          {/* <CreateForms /> */}
          {/* <SideBar /> */}

          {/* <Form/> */}
          {/* <Form/> */}
        </div>
      </ControllProvider>
    </FormProvider>
  );
};

export default App;
