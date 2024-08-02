import React, { useState } from "react";
import Fields from "../../components/Fields/Fields"; // Make sure this path matches your file structure
import Box from "../../components/Box/Box";
// import axios from 'axios'; // Assuming you are using axios for HTTP requests

// Mock data for the form fields
const formFields = [
  {
    type: "text",
    name: "username",
    placeholder: "Enter your username",
    value: "",
    maxLength: 20,
  },
  { type: "email", name: "email", placeholder: "Enter your email", value: "" },
  {
    type: "password",
    name: "password",
    placeholder: "Enter your password",
    value: "",
    maxLength: 30,
  },
  {
    type: "number",
    name: "age",
    placeholder: "Enter your age",
    value: "",
    min: 18,
    max: 100,
    pattern: "\\d+",
  },
  {
    type: "select",
    name: "country",
    placeholder: "",
    options: [
      { value: "", label: "Select your country" },
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "mx", label: "Mexico" },
    ],
    value: "",
  },
  {
    type: "checkbox",
    name: "hobbies",
    options: [
      { value: "reading", label: "Reading" },
      { value: "traveling", label: "Traveling" },
      { value: "gaming", label: "Gaming" },
    ],
    value: [],
  },
  {
    type: "radio",
    name: "gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
    value: "",
  },
  {
    type: "multiselect",
    name: "skills",
    options: [
      { value: "javascript", label: "JavaScript" },
      { value: "react", label: "React" },
      { value: "node", label: "Node.js" },
    ],
    value: [],
  },
];

const Form = () => {
  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {})
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const newValue = (e.target as HTMLInputElement).checked
        ? [...(formData[name] as string[]), value]
        : (formData[name] as string[]).filter((v) => v !== value);
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (type === "select-multiple") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prev) => ({ ...prev, [name]: selectedOptions }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post('https://example.com/api/submit', formData);
  //       console.log('Form submitted successfully:', response.data);
  //     } catch (error) {
  //       console.error('Error submitting form:', error);
  //     }
  //   };

  return (
    <Box className="w-full"> 
      <form
        className="space-y-4 w-full mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
        }}
      >
        {formFields.map((field) => (
          <Fields
            key={field.name}
            type={field.type}
            name={field.name}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="p-2"
            options={field.options}
            value={formData[field.name]}
            maxLength={field.maxLength}
            min={field.min}
            max={field.max}
            pattern={field.pattern}
          />
        ))}
        <div className="flex flex-col items-end m-2">
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </div>
      </form>
    </Box>
  );
};

export default Form;
