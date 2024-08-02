import React, { useState } from "react";
import { Label, Select, Container, Input } from "../FiledsStyle"; // Assuming Container, Typography, and Input are imported from FieldsStyle
import EditableLabel from "../EditableLabel/EditableLabel";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectFieldProps {
  name?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOption?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  options?: Option[];
  values?: string[];
  index: number;
  required?: boolean;
  uppercaseFunction: (str: string) => string;
}

const MultiSelectField = ({
  name,
  onClick,
  onChange,
  className,
  options,
  values,
  index,
  required,
  onChangeTitle,
  onChangeOption,
}: MultiSelectFieldProps) => {
  const [newOption, setNewOption] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState<Option[]>(options || []);
  const [selectedValues, setSelectedValues] = useState<string[]>(values || []);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleAddOption = () => {
    if (newOption.trim() === "") return;
    const updatedOptions = [
      ...currentOptions,
      { value: newOption, label: newOption },
    ];
    setCurrentOptions(updatedOptions);
    setNewOption("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddOption();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Container
      onMouseOver={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      className="p-2"
    >
      <Label className={className}>
        <EditableLabel
          name={name || ""}
          index={index}
          required={required}
          onClick={onClick}
          onChangeTitle={onChangeTitle}
          showDetails={showDetails}
        />
        <Select
          className={className}
          name={name}
          onClick={onClick}
          onChange={handleChange}
          multiple
          value={selectedValues}
          required={required}
        >
          {currentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <div className="mt-2 flex items-center gap-2">
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

export default MultiSelectField;
