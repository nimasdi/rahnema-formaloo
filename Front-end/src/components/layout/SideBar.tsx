import React, { useEffect, useState } from "react";
import Box from "../Box/Box";
import Switch from "react-switch";
import tw from "tailwind-styled-components";
import { useControll } from "../../context/ControllerContext";
import { uppercaseFunction } from "../../Utils/uppercaseFunction";
import { useForm } from "../../context/FormContext";

type Props = {};

// Styled components using tailwind-styled-components
const Container = tw.div`
  flex flex-col gap-4 p-4
`;

const SwitchWrapper = tw.div`
  flex items-center gap-2
`;

const Label = tw.label`
  block mb-2 text-gray-700 font-semibold
`;

const Input = tw.input`
  border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500
`;

const SidebarTitle = tw.h2`
  text-xl font-semibold mb-4
`;

function SideBar({}: Props) {
  const [required, setRequired] = useState(false);
  const [maxLength, setMaxLength] = useState<number | "">(10);
  const [min, setMin] = useState<number | "">(0);
  const [max, setMax] = useState<number | "">(100);
  const [regex, setRegex] = useState("");
  const { selectedInput, selectedIndex } = useControll();
  const { formFields, setFormFields } = useForm();

  useEffect(() => {
    if (selectedIndex !== null && formFields[selectedIndex]) {
      const { validation } = formFields[selectedIndex];
      setRequired(validation?.required || false);
      setMaxLength(validation?.maxLength || 10);
      setMin(validation?.min || 0);
      setMax(validation?.max || 100);
      setRegex(validation?.regex || "");
    }
  }, [selectedIndex, formFields]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement> | boolean) => {
    if (selectedIndex === null) return;

    const value = field === "required" ? (e as boolean) : Number((e as React.ChangeEvent<HTMLInputElement>).target.value) || "";
    
    setFormFields((prev) =>
      prev.map((el, i) =>
        i === selectedIndex
          ? {
              ...el,
              validation: {
                ...el.validation,
                [field]: value,
              },
            }
          : el
      )
    );

    if (field === "required") {
      setRequired(value as boolean);
    } else if (field === "maxLength") {
      setMaxLength(value);
    } else if (field === "min") {
      setMin(value);
    } else if (field === "max") {
      setMax(value);
    } else if (field === "regex") {
      setRegex((e as React.ChangeEvent<HTMLInputElement>).target.value);
    }
  };

  return (
    <Box className="w-full"  height="flex gap-2 h-full " title={uppercaseFunction(selectedInput.name)}>
      <Container>
        <SidebarTitle>Validations</SidebarTitle>

        <SwitchWrapper>
          <Switch onChange={handleChange("required")} checked={required} />
          <div>Required</div>
        </SwitchWrapper>

        <div>
          <Label>Max Length:</Label>
          <Input
            type="number"
            value={maxLength}
            onChange={handleChange("maxLength")}
            placeholder="Enter max length"
          />
        </div>

        <div>
          <Label>Min Value:</Label>
          <Input
            type="number"
            value={min}
            onChange={handleChange("min")}
            placeholder="Enter min value"
          />
        </div>

        <div>
          <Label>Max Value:</Label>
          <Input
            type="number"
            value={max}
            onChange={handleChange("max")}
            placeholder="Enter max value"
          />
        </div>

        <div>
          <Label>Regex Pattern:</Label>
          <Input
            type="text"
            value={regex}
            onChange={handleChange("regex")}
            placeholder="Enter regex pattern"
          />
        </div>
      </Container>
    </Box>
  );
}

export default SideBar;
