import { createContext, useReducer } from "react";

export const PersonsContext = createContext();

export const personsReducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "SET_PERSONS":
      return {
        persons: action.payload,
        // searchElements: action.payload,
      };
    case "CREATE_PERSONS":
      return {
        persons: [action.payload, ...state.persons],
        // searchElements: [action.payload, ...state.searchElements],
      };
    case "DELETE_PERSON":
      console.log(state.persons);
      return {
        persons: state.persons.filter((w) => w._id !== action.payload._id),
        // searchElements: state.searchElements.filter(
        //   (w) => w._id !== action.payload._id
        // ),
      };
    case "UPDATE_PERSON":
      const updatedPerson = action.payload;

      return {
        persons: [updatedPerson],
        // searchElements: [updatedPerson],
      };

    case "FILTER_BLOGS":
      return {
        ...state,
        filtered: state.persons.filter((w) => {
          const regex = new RegExp(`${action.payload}`, "ig");
          return w.name.match(regex);
          // return w.name.toLowerCase().startsWith(action.payload.toLowerCase());
        }),
      };

    case "CLEAR_FILTER":
      return {
        ...state,
        filtered: [state.persons],
      };

    case "DELETE_SEARCH":
      console.log(state.filtered);
      return {
        persons: state.filtered.filter((w) => w._id !== action.payload._id),
        // searchElements: state.searchElements.filter(
        //   (w) => w._id !== action.payload._id
        // ),
      };
    default:
      return state;
  }
};

export const PersonsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personsReducer, {
    persons: null,
    filtered: null,
  });

  const filterBlogs = (text) => {
    dispatch({ type: "FILTER_BLOGS", payload: text });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  return (
    <PersonsContext.Provider
      value={{
        persons: state.persons,
        filtered: state.filtered,
        filterBlogs,
        clearFilter,
        dispatch,
      }}
    >
      {children}
    </PersonsContext.Provider>
  );
};
