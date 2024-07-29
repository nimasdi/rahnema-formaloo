import React from 'react';
import { Label, Input, Select, CheckboxContainer, CheckboxInput, RadioInput } from '../Fields/FiledsStyle';

interface Option {
  value: string;
  label: string;
}

interface FieldsProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'radio' | 'multiselect';
  name?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  options?: Option[]; // for select, multiselect, checkbox, and radio
  value?: string | number | string[];
  label?: string;
}

const Fields = ({
  type,
  name,
  onClick,
  onChange,
  placeholder,
  className,
  options,
  value,
  label,
}: FieldsProps) => {
  
  switch (type) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
      return (
        <Label className={className}>
          {label && <span>{label}</span>}
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
      );
    case 'select':
      return (
        <Label className={className}>
          {label && <span>{label}</span>}
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
      );
    case 'checkbox':
      return (
        <Label className={className}>
          {label && <span>{label}</span>}
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
    case 'radio':
      return (
        <Label className={className}>
          {label && <span>{label}</span>}
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
