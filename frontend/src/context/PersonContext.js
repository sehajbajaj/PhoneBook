import { createContext, useReducer } from "react";

export const PersonsContext = createContext();

export const personsReducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "SET_PERSONS":
      return {
        persons: action.payload,
      };
    case "CREATE_PERSONS":
      return {
        persons: [action.payload, ...state.persons],
      };
    case "DELETE_PERSON":
      console.log(state.persons);
      return {
        persons: state.persons.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_PERSON":
      const updatedPerson = action.payload;

      return {
        persons: [updatedPerson],
      };

    default:
      return state;
  }
};

export const PersonsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personsReducer, {
    persons: null,
  });

  return (
    <PersonsContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </PersonsContext.Provider>
  );
};
