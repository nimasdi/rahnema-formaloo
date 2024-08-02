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
}
const CreateForms = () => {
  const { showModal, setShowModal } = useControll();
  const closeModal = () => setShowModal(false);
  const { formFields, setFormFields } = useForm();
  const [formCard, setFormCard] = useState(formFields);

  useEffect(() => {
    console.log("formFields updated:", formFields);
    setFormCard([...formFields]);
  }, [formFields]);

  console.log("formCard", formCard);

  return (
    <Box height="">
      <form >
        {formCard.map((el, index) => {
          return (
            <Fields
              index={index}
              key={index} // Add a unique key here
              type={el.type}
              value={el.value}
              placeholder={el.placeholder}
              name={el.name}
            />
          );
        })}

        {showModal && (
          <Modal isOpen={showModal} onClose={closeModal} title="Modal Title" />
        )}
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "cener",
            gap: "4px",
          }}
          onClick={() => setShowModal(true)}
        >
          Add Items
          <FaPlus />
        </div>
      </form>
    </Box>
  );
};
export default CreateForms;
