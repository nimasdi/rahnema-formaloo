// src/context/FormContext.tsx
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface FormFieldState {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  maxLength?: number;
}

type FormContextType = {
  theme: string;
  toggleTheme: () => void;
  formFields: FormFieldState[];
  setFormFields: Dispatch<SetStateAction<FormFieldState[]>>; // Correct type for state setter
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [formFields, setFormFields] = useState<FormFieldState[]>([
    {
      type: "text",
      name: "username",
      placeholder: "Enter your username",
      value: "",
      maxLength: 20,
    },
    {
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      value: "",
    },
  ]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <FormContext.Provider
      value={{ theme, toggleTheme, formFields, setFormFields }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
