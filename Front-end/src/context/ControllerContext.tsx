import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type ControllContextType = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedInput: any;
  setSelectedInput: Dispatch<SetStateAction<boolean>>;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

const ControllContext = createContext<ControllContextType | undefined>(
  undefined
);

export const ControllProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInput, setSelectedInput] = useState([{}]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ControllContext.Provider
      value={{
        setShowModal,
        showModal,
        selectedInput,
        setSelectedInput,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </ControllContext.Provider>
  );
};

export const useControll = (): ControllContextType => {
  const context = useContext(ControllContext);
  if (!context) {
    throw new Error("useControll must be used within a ControllProvider");
  }
  return context;
};
