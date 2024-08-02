import React, { useState } from "react";
import {
  CheckboxContainer,
  Container,
  Input,
  Label,
  RadioInput,
} from "../FiledsStyle";

import Controller from "../../Modal/Controller/Controller";
import Button from "../../Button/Button";
import Typography from "../../Typography/Typography";
import { uppercaseFunction } from "../../../Utils/uppercaseFunction";
import EditableLabel from "../EditableLabel/EditableLabel";

interface Option {
  value: string;
  label: string;
}

interface RadioFieldProps {
  name?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOption?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    optionIndex: number
  ) => void;
  className?: string;
  options?: Option[];
  value?: string;
  index: number;
  required?: boolean;
}

const RadioField = ({
  name,
  onClick,
  onChange,
  className,
  options,
  value,
  index,
  required,
  onChangeTitle,
  onChangeOption,
}: RadioFieldProps) => {
  const [newOption, setNewOption] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleAddOption = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
        {options?.map((option, optionIndex) => (
          <CheckboxContainer key={option.value} className={className}>
            <RadioInput
              className={className}
              name={name}
              onClick={onClick}
              onChange={onChange}
              type="radio"
              value={option.value}
              checked={value === option.value}
              required={required}
            />

            {edit ? (
              <input
                key={optionIndex}
                type="text"
                placeholder="addOption"
                value={option.value}
                onChange={(e) => onChangeOption?.(e, optionIndex)}
                className="pointer-text border-none bg-transparent p-0 font-bold text-md outline-none"
              />
            ) : (
              <span onClick={() => setEdit(true)}>{option.label}</span>
            )}
          </CheckboxContainer>
        ))}
        <div>
          <input
            type="text"
            placeholder="addOption"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pointer-text border-none bg-transparent p-0 font-bold text-md outline-none"
          />
          <Button onClick={handleAddOption}>Add</Button>
        </div>
      </Label>
    </Container>
  );
};

export default RadioField;
