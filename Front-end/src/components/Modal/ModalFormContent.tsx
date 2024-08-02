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
  options?: { value: string; label: string }[];
}

const MyModalContent = () => {
  const [switchState, setSwitchState] = useState({
    text: false,
    email: false,
    multiSelect: false,
    radio: false,
    checkbox: false,
    select: false,
    number: false,
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
 
    setFormFields((prevItems) => {
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
        case "number":
          if (checked) {
            newItems = [
              ...newItems,
              {
                type: "number",
                name: "Number",
                placeholder: "Enter your number",
                value: "",
                maxLength: 20,
              },
            ];
          } else {
            newItems = newItems.filter((item) => item.type !== "number");
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
                placeholder: "Enter your multiSelect",

                options: [
                  { value: "yes", label: "yes" },
                  { value: "no", label: "no" },
                ],
                value: "",
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

                options: [
                  { value: "yes", label: "yes" },
                  { value: "no", label: "no" },
                ],
                value: "",
              },
            ];
          } else {
            newItems = newItems.filter((item) => item.type !== "radio");
          }
          break;
        case "checkbox":
          if (checked) {
            newItems = [
              ...newItems,
              {
                type: "checkbox",
                name: "genderdfghjk",
                placeholder: "Enter your checkbox",

                options: [
                  { value: "yes", label: "yes" },
                  { value: "no", label: "no" },
                ],
                value: "",
              },
            ];
          } else {
            newItems = newItems.filter((item) => item.type !== "checkbox");
          }
          break;
        case "select":
          if (checked) {
            newItems = [
              ...newItems,
              {
                type: "select",
                name: "select",
                placeholder: "Enter your select",

                options: [
                  { value: "yes", label: "yes" },
                  { value: "no", label: "no" },
                ],
                value: "",
              },
            ];
          } else {
            newItems = newItems.filter((item) => item.type !== "select");
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
      {/* <ModalItems>
        <LabelWithIcon>
          <FaTasks />
          <div>multi-select checkbox</div>
        </LabelWithIcon>
        <Switch
          onChange={handleSwitchChange("multiSelect")}
          checked={switchState.multiSelect}
        />
      </ModalItems> */}
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
          <div>checkbox</div>
        </LabelWithIcon>
        <Switch
          onChange={handleSwitchChange("checkbox")}
          checked={switchState.checkbox}
        />
      </ModalItems>
      <ModalItems>
        <LabelWithIcon>
          <FaListAlt />
          <div>select</div>
        </LabelWithIcon>
        <Switch
          onChange={handleSwitchChange("select")}
          checked={switchState.select}
        />
      </ModalItems>
      <ModalItems>
        <LabelWithIcon>
          <FaListAlt />
          <div>Number</div>
        </LabelWithIcon>
        <Switch
          onChange={handleSwitchChange("number")}
          checked={switchState.number}
        />
      </ModalItems>
      {/* <Button primary onClick={AddHandler}>
        Add
      </Button> */}
    </>
  );
};

export default MyModalContent;
