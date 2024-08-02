// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import { ControllProvider } from "./context/ControllerContext";
import Home from "./Pages/Home";
import ShowForms from "./Pages/ShowForms/ShowForms";
import CreateForms from "./Pages/CreateForm/CreateForms";
import UserForm from "./Pages/UserForm/UserForm";
import ShowResults from "./Pages/ShowResults/ShowResults";
import SideBar from "./components/layout/SideBar";
// import NotFound from './Pages/NotFound'; // Optional: Create this component for 404 handling

const App: React.FC = () => {
  return (
    <FormProvider>
      <ControllProvider>
        <Router>
          <div className="flex gap-8 justify-between">
            {/* Assuming you have a sidebar for navigation */}
            <div className="flex-1">
              <Routes>
                {/* <CreateForms /> */}
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/forms" element={<ShowForms />} />
                <Route path="/create-forms" element={<CreateForms />} />
                <Route path="/create-forms/:id" element={<CreateForms />} />

                <Route path="/" element={<UserForm />} />
                {/* <Route path="/results" element={<ShowResults />} /> */}
                {/* <Route path="*" element={<NotFound />} /> Optional */}
              </Routes>
            </div>
          </div>
        </Router>
      </ControllProvider>
    </FormProvider>
  );
};

export default App;
