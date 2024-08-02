import { useState } from "react";
import tw from "tailwind-styled-components";
import Switch from "react-switch";
import {
  FaUser,
  FaEnvelope,
  FaTasks,
  FaGenderless,
  FaListAlt,
} from "react-icons/fa";
import { useForm } from "../../context/FormContext";
import Button from "../Button/Button";
import { useControll } from "../../context/ControllerContext";

const ModalItems = tw.div`
  flex justify-between items-center bg-white rounded-lg shadow-lg w-full p-6 mb-4
`;

const LabelWithIcon = tw.div`
  flex items-center space-x-2
`;

interface FormField {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  maxLength?: number;
}

const MyModalContent = () => {
  const [switchState, setSwitchState] = useState({
    text: false,
    email: false,
    multiSelect: false,
    radio: false,
    dropdown: false,
  });

  const { formFields, setFormFields } = useForm();
  const { showModal, setShowModal } = useControll();
  const [items, setItems] = useState<FormField[]>([]);

  const AddHandler = () => {
    setShowModal(false);
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields, ...items];
      console.log(updatedFields); // Log to see the updated fields
      return updatedFields;
    });
  };

  const handleSwitchChange = (key: string) => (checked: boolean) => {
    setSwitchState((prevState) => ({ ...prevState, [key]: checked }));
    setItems((prevItems) => {
      let newItems = [...prevItems];
      switch (key) {
        case "text":
          if (checked) {
            newItems = [
              ...newItems,
              {
                type: "text",
                name: "username",
                placeholder: "Enter your username",
                value: "",
                maxLength: 20,
              },
            ];
          } else {
            newItems = newItems.filter((item) => item.type !== "text");
          }
          break;
        case "email":
          if (checked) {
            newItems = [
              ...newItems,
              {
                type: "email",
                name: "Email",
                placeholder: "Enter your Email",
                value: "",
                maxLength: 20,
              },
            ];
          } else {
            newItems = newItems.filter((item) => item.type !== "email");
          }
          break;
        case "multiSelect":
          if (checked) {
            newItems = [
              ...newItems,
              {
                type: "multiSelect",
                name: "multiSelect",
                placeholder: "Enter your Email",
                value: "",
                maxLength: 20,
              },
            ];
          } else {
            newItems = newItems.filter((item) => item.type !== "multiSelect");
          }
          break;
        case "radio":
          if (checked) {
            newItems = [
              ...newItems,
              {
                type: "radio",
                name: "radio",
                placeholder: "Enter your radio",
                value: "",
                maxLength: 20,
              },
            ];
          } else {
            newItems = newItems.filter((item) => item.type !== "radio");
          }
          break;
        case "dropdown":
          if (checked) {
            newItems = [
              ...newItems,
              {
                type: "dropdown",
                name: "dropdown",
                placeholder: "Enter your dropdown",
                value: "",
                maxLength: 20,
              },
            ];
          } else {
            newItems = newItems.filter((item) => item.type !== "dropdown");
          }
          break;
        default:
          break;
      }
      return newItems;
    });
  };

  return (
    <>
      <ModalItems>
        <LabelWithIcon>
          <FaUser />
          <div>Text</div>
        </LabelWithIcon>
        <Switch
          onChange={handleSwitchChange("text")}
          checked={switchState.text}
        />
      </ModalItems>
      <ModalItems>
        <LabelWithIcon>
          <FaEnvelope />
          <div>Email</div>
        </LabelWithIcon>
        <Switch
          onChange={handleSwitchChange("email")}
          checked={switchState.email}
        />
      </ModalItems>
      <ModalItems>
        <LabelWithIcon>
          <FaTasks />
          <div>multi-select checkbox</div>
        </LabelWithIcon>
        <Switch
          onChange={handleSwitchChange("multiSelect")}
          checked={switchState.multiSelect}
        />
      </ModalItems>
      <ModalItems>
        <LabelWithIcon>
          <FaGenderless />
          <div>radio</div>
        </LabelWithIcon>
        <Switch
          onChange={handleSwitchChange("radio")}
          checked={switchState.radio}
        />
      </ModalItems>
      <ModalItems>
        <LabelWithIcon>
          <FaListAlt />
          <div>select/dropdown</div>
        </LabelWithIcon>
        <Switch
          onChange={handleSwitchChange("dropdown")}
          checked={switchState.dropdown}
        />
      </ModalItems>
      <Button primary onClick={AddHandler}>
        Add
      </Button>
    </>
  );
};

export default MyModalContent;
