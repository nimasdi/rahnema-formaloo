// TextField.tsx
import React, { useState } from "react";
import { Container, Input, Label } from "../FiledsStyle";
import Controller from "../../Modal/Controller/Controller";
import Typography from "../../Typography/Typography";
import { uppercaseFunction } from "../../../Utils/uppercaseFunction";
import EditableLabel from "../EditableLabel/EditableLabel";

interface TextFieldProps {
  type: "text" | "number" | "email" | "password";
  name?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  value?: string | number;
  index?: number;
  required?: boolean;
}

const TextField = ({
  type,
  name,
  onClick,
  onChange,
  onChangeTitle,
  placeholder,
  className,
  value,
  index,
  required,
}: TextFieldProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

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
          uppercaseFunction={uppercaseFunction}
        />
        <Input
          className={className}
          index={2}
          name={name}
          onClick={onClick}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value as string | number}
        />
      </Label>
    </Container>
  );
};

export default TextField;
