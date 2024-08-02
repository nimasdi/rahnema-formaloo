import React, { useState } from "react";
import {
  Label,
  Input,
  Select,
  CheckboxContainer,
  CheckboxInput,
  RadioInput,
  Container,
} from "../Fields/FiledsStyle";
import Modal from "../Modal/Modal";
import Controller from "../Modal/Controller/Controller";
import Button from "../Button/Button";
import { useControll } from "../../context/ControllerContext";
import Typography from "../Typography";
import { uppercaseFunction } from "../../Utils/uppercaseFunction";

interface Option {
  value: string;
  label: string;
}

interface FieldsProps {
  type?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "select"
    | "checkbox"
    | "radio"
    | "multiselect";
  name?: string;
  onClick?: () => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  className?: string;
  options?: Option[]; // for select, multiselect, checkbox, and radio
  value?: string | number | string[];
  label?: string;
  index: number;
}

const Fields = ({
  type,
  index,
  name,
  onClick,
  onChange,
  placeholder,
  className,
  options,
  value,
  label,
}: FieldsProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleBlur = () => {
    setIsEditable(false);
  };
  const handleMouseOver = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };
  switch (type) {
    case "text":
    case "number":
    case "email":
    case "password":
      return (
        <Container
          onMouseOver={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
          style={{ padding: "0 8px" }}
        >
          <Label className={className}>
            {name && !isEditable && (
              <div className="relative">
                {showDetails && <Controller index={index} />}
                <Typography
                  onClick={() => setIsEditable(true)}
                  variant="span"
                  className="cursor-text py-4 font-bold text-md"
                  size="text-md"
                >
                  {uppercaseFunction(name)}
                </Typography>
              </div>
            )}
            {isEditable && (
              <Input
                className="pointer-text border-none bg-transparent p-0 font-bold text-md outline-none"
                name={name}
                onClick={onClick}
                onChange={onChange}
                onBlur={handleBlur}
                type={type}
                required
                placeholder={placeholder}
                value={
                  name ? name.charAt(0).toUpperCase() + name.slice(1) : name
                }
                autoFocus
              />
            )}
            <Input
              className={className}
              name={name}
              onClick={onClick}
              onChange={onChange}
              type={type}
              required
              placeholder={placeholder}
              value={value as string | number}
            />
          </Label>
        </Container>
      );
    case "select":
      return (
        <React.Fragment>
          <Label className={className}>
            {name && (
              <div className="relative">
                <Controller />
                <span className="py-2 font-bold">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
              </div>
            )}
            <Select
              className={className}
              name={name}
              onClick={onClick}
              onChange={onChange}
              value={value as string | number}
              required
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Label>
        </React.Fragment>
      );
    case "checkbox":
      return (
        <Label className={className}>
          {name && (
            <div className="relative">
              <Controller />
              <span className="py-2 font-bold">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            </div>
          )}
          {options?.map((option) => (
            <CheckboxContainer key={option.value} className={className}>
              <CheckboxInput
                className={className}
                name={name}
                onClick={onClick}
                onChange={onChange}
                type="checkbox"
                value={option.value}
                checked={(value as string[]).includes(option.value)}
              />
              <span>{option.label}</span>
            </CheckboxContainer>
          ))}
        </Label>
      );
    case "radio":
      return (
        <Label className={className}>
          {name && (
            <div className="relative">
              <Controller />
              <span className="py-2 font-bold">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            </div>
          )}
          {options?.map((option) => (
            <CheckboxContainer key={option.value} className={className}>
              <RadioInput
                className={className}
                name={name}
                onClick={onClick}
                onChange={onChange}
                type="radio"
                value={option.value}
                checked={value === option.value}
              />
              <span>{option.label}</span>
            </CheckboxContainer>
          ))}
        </Label>
      );
    default:
      return null;
  }
};

export default Fields;
