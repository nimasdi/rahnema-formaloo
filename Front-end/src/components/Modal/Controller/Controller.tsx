import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import Modal from "../Modal";
import { useControll } from "../../../context/ControllerContext";
import { useForm } from "../../../context/FormContext";

type Props = { index: number };

export default function Controller({ index }: Props) {
  const { setShowModal } = useControll();
  const { formFields, setFormFields } = useForm();

  const deleteItems = () => {
    const filterItems = formFields.filter((_, i) => index !== i);
    setFormFields(filterItems);
  };

  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          right: "101%",
          display: "flex",
          gap: "8px",
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={deleteItems}>
          <FaTrash size={20} color="red" />
        </div>
        {/* <div style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}>
          <FaPlus size={20} />
        </div> */}
      </div>
    </React.Fragment>
  );
}
