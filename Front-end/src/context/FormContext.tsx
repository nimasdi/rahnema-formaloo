// src/context/FormContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface FormFieldState {
  type: string;
  name: string;
  placeholder?: string;  // placeholder is optional now
  value?: string;  // value is optional now
  maxLength?: number;
  validations?: {
    required?: boolean;
    minLength?: string;
  };
  options?: string[];
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
      validations: { required: true },
      options: ["Option1", "Option2"],
    },
    {
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      value: "",
      validations: { minLength: "5" },
      options: ["OptionA", "OptionB"],
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
