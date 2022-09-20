import { PersonsContext } from "../context/PersonContext";
import { useContext } from "react";

export const usePersonsContext = () => {
  const context = useContext(PersonsContext);
  if (!context) {
    throw Error(
      "usePersonsContext must be used inside an PersonsContextProvider"
    );
  }
  return context;
};
