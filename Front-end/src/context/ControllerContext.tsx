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
};

const ControllContext = createContext<ControllContextType | undefined>(undefined);

export const ControllProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ControllContext.Provider value={{ setShowModal, showModal }}>
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
