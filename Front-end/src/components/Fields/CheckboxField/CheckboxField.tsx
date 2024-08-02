// CheckboxField.tsx
import React, { useState } from "react";
import {
  CheckboxContainer,
  CheckboxInput,
  Container,
  Input,
  Label,
} from "../FiledsStyle";
import Controller from "../../Modal/Controller/Controller";
import Typography from "../../Typography/Typography";
import { uppercaseFunction } from "../../../Utils/uppercaseFunction";
import EditableLabel from "../EditableLabel/EditableLabel";

interface Option {
  value: string;
  label: string;
}

interface CheckboxFieldProps {
  name?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  className?: string;
  options?: Option[];
  value?: string[];
  index: number;
  required?: boolean;
}

const CheckboxField = ({
  name,
  onClick,
  onChange,
  className,
  options,
  value,
  index,
  onChangeTitle,
  required,
}: CheckboxFieldProps) => {
  const [newOption, setNewOption] = useState<string>("");

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
      handleAddOption(e as any); // Casting to any to pass the event object
    }
  };
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleBlur = () => {
    setIsEditable(false);
  };

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
        {options?.map((option) => (
          <CheckboxContainer key={option.value} className={className}>
            <CheckboxInput
              className={className}
              name={name}
              onClick={onClick}
              onChange={onChange}
              type="checkbox"
              value={option.value}
              checked={value?.includes(option.value)}
            />
            <span>{option.label}</span>
          </CheckboxContainer>
        ))}
        <div>
          <input
            type="text"
            placeholder="addOption"
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

export default CheckboxField;
