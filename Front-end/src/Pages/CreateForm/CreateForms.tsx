import React, { useEffect, useState } from "react";
import Fields from "../../components/Fields/Fields";
import Modal from "../../components/Modal/Modal";

import { useControll } from "../../context/ControllerContext";
import { useForm } from "../../context/FormContext";
import Button from "../../components/Button/Button";
import { FaPlus } from "react-icons/fa";
import Box from "../../components/Box/Box";

interface formFieldsState {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  maxLength?: number;
  options?: { value: string; label: string }[];
  validation: {
    required: boolean;
  };
}

const CreateForms = () => {
  const { showModal, setShowModal } = useControll();
  const closeModal = () => setShowModal(false);
  const { formFields, setFormFields } = useForm();
  const [formCard, setFormCard] = useState<formFieldsState[]>(formFields);

  useEffect(() => {
    setFormCard([...formFields]);
  }, [formFields]);

  const changeHandlerTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { value } = e.target;
    setFormCard((prev) =>
      prev.map((field, i) => (i === index ? { ...field, name: value } : field))
    );
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { value } = e.target;
    setFormCard((prev) =>
      prev.map((field, i) => (i === index ? { ...field, value: value } : field))
    );
  };

  const changeHandlerOption = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    optionIndex: number
  ) => {
    const { value } = e.target;
    setFormCard((prev) =>
      prev.map((field, i) =>
        i === index
          ? {
              ...field,
              options: field.options?.map((option, j) =>
                j === optionIndex ? { ...option, value: value } : option
              ),
            }
          : field
      )
    );
  };

  const addOptionHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { value } = e.target;
    setFormCard((prev) =>
      prev.map((field, i) =>
        i === index
          ? {
              ...field,
              options: field.options
                ? [...field.options, { value: value, label: value }]
                : [{ value: value, label: value }],
            }
          : field
      )
    );
  };
  const { setSelectedInput, setSelectedIndex } = useControll();
  const getSelectedInput = (el, index: number) => {
    setSelectedInput(el);
    setSelectedIndex(index);
  };
  // console.log("formnCard",formCard);

  return (
    <Box width="w-full">
      <form>
        {formCard.map((el, index) => {
          return (
            <Fields
              key={index}
              index={index}
              required={el?.validation?.required}
              type={el.type}
              options={el.options}
              value={el.value}
              placeholder={el.placeholder}
              name={el.name}
              onChange={(e) => changeHandler(e, index)}
              onChangeTitle={(e) => changeHandlerTitle(e, index)}
              onChangeOption={(e, optionIndex) =>
                changeHandlerOption(e, index, optionIndex)
              }
              onAddOption={(e) => addOptionHandler(e, index)}
              onClick={() => getSelectedInput(el, index)}
            />
          );
        })}

        {showModal && (
          <Modal isOpen={showModal} onClose={closeModal} title="Modal Title" />
        )}
      </form>
      <Button
        primary
        className="flex items-center gap-2 mx-2 mt-4"
        onClick={() => setShowModal(true)}
      >
        Add Items
        <FaPlus />
      </Button>
    </Box>
  );
};

export default CreateForms;
