// SelectField.tsx
import React, { useState } from "react";
import { Container, Input, Label, Select } from "../FiledsStyle";
import Controller from "../../Modal/Controller/Controller";
import Typography from "../../Typography/Typography";
import { uppercaseFunction } from "../../../Utils/uppercaseFunction";
import EditableLabel from "../EditableLabel/EditableLabel";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  options?: Option[];
  value?: string | number;
  index: number;
  required?: boolean;
}

const SelectField = ({
  name,
  onClick,
  onChange,
  className,
  options,
  value,
  index,
  required,
  onChangeTitle,
}: SelectFieldProps) => {
  const [newOption, setNewOption] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleAddOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (newOption.trim() === "") return;
    options?.push({ value: newOption, label: newOption });
    setNewOption("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddOption(e as any);
    }
  };
  console.log("optionsoptions", options);

  return (
    <Container
      onMouseOver={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      style={{ padding: "0 8px" }}
    >
      <Label className={className}>
        <EditableLabel
          name={name || ""}
          index={index}
          showDetails={showDetails}
          required={required}
          onClick={onClick}
          onChangeTitle={onChangeTitle}
        />
        <Select
          className={className}
          name={name}
          onClick={onClick}
          onChange={onChange}
          value={value as string | number}
          required={required}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <div className="mt-4">
          <input
            className="pointer-text border-none bg-transparent p-0 font-bold text-md outline-none"
            type="text"
            placeholder="Add Option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleAddOption}>Add</button>
        </div>
      </Label>
    </Container>
  );
};

export default SelectField;
