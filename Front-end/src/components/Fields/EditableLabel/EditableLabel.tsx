import React, { useState } from "react";
import Controller from "../../Modal/Controller/Controller";
import Typography from "../../Typography/Typography";
import { Input } from "../FiledsStyle";
import { uppercaseFunction } from "../../../Utils/uppercaseFunction";

interface EditableLabelProps {
  name: string;
  index: number;
  required?: boolean;
  onClick?: () => void;
  onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showDetails: boolean;
}

const EditableLabel = ({
  name,
  index,
  required,
  onClick,
  onChangeTitle,
  showDetails,
}: EditableLabelProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleBlur = () => {
    setIsEditable(false);
  };

  return (
    <>
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
            {required && <span className="text-red-500 ml-1">*</span>}

          </Typography>
        </div>
      )}
      {isEditable && (
        <Input
          className="pointer-text border-none bg-transparent p-0 font-bold text-md outline-none"
          name={name}
          onClick={onClick}
          onChange={onChangeTitle}
          onBlur={handleBlur}
          type={"text"}
          required={required}
          placeholder={"Add Option"}
          value={name && uppercaseFunction(name)}
          autoFocus
        />
      )}
    </>
  );
};

export default EditableLabel;
