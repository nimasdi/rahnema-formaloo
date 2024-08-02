// Fields.tsx
import React from "react";
import TextField from "./TextField/TextField";
import SelectField from "./SelectField/SelectField";
import CheckboxField from "./CheckboxField/CheckboxField";
import RadioField from "./RadioField/RadioField";
import MultiSelectField from "./MultiSelectField/MultiSelectField";

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
    | "multiSelect";
  name?: string;
  onClick?: () => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onChangeTitle?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onChangeOption?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    optionIndex: number
  ) => void;
  placeholder?: string;
  className?: string;
  options?: Option[]; // for select, multiselect, checkbox, and radio
  value?: string | number | string[];
  label?: string;
  index: number;
  required?: boolean;
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
  required,
  onChangeTitle,
  onChangeOption,
}: FieldsProps) => {
  switch (type) {
    case "text":
    case "number":
    case "email":
    case "password":
      return (
        <TextField
          type={type}
          name={name}
          onClick={onClick}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          value={value as string | number}
          index={index}
          required={required}
          onChangeTitle={onChangeTitle}
        />
      );
    case "select":
      return (
        <SelectField
          name={name}
          onClick={onClick}
          onChange={onChange}
          className={className}
          options={options}
          value={value as string | number}
          index={index}
          required={required}
          onChangeTitle={onChangeTitle}
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          name={name}
          onClick={onClick}
          onChange={onChange}
          className={className}
          options={options}
          value={value as string[]}
          index={index}
          required={required}
          onChangeTitle={onChangeTitle}
        />
      );
    case "radio":
      return (
        <RadioField
          name={name}
          onClick={onClick}
          onChange={onChange}
          className={className}
          options={options}
          value={value as string}
          index={index}
          required={required}
          onChangeTitle={onChangeTitle}
          onChangeOption={onChangeOption}
        />
      );
    // case "multiSelect":
    //   return (
    //     <MultiSelectField
    //       name={name}
    //       onClick={onClick}
    //       onChange={onChange}
    //       className={className}
    //       options={options}
    //       index={index}

    //       // value={value as string}
    //       required={required}
    //       onChangeTitle={onChangeTitle}
    //       onChangeOption={onChangeOption}
    //     />
    //   );
    default:
      return null;
  }
};

export default Fields;
