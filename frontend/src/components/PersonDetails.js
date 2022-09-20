import { Link } from "react-router-dom";
import { usePersonsContext } from "../hooks/usePersonsContext";

const PersonDetails = ({ person, fil }) => {
  const { dispatch } = usePersonsContext();

  const handleDelete = async () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const response = await fetch("/api/persons/" + person._id, {
        method: "DELETE",
      });
      const json = await response.json();

      if (!response.ok) {
        alert(`${person.name} is already deleted from the phonebook!`);
      }

      if (response.ok) {
        if (fil) {
          dispatch({ type: "DELETE_SEARCH", payload: json });
        } else {
          dispatch({ type: "DELETE_PERSON", payload: json });
        }
      }
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{person.name}</div>
            </div>
          </div>
        </td>
        <td>{person.number}</td>
        <td>{person.location}</td>
        <th className="flex space-x-4">
          <Link to={"/update/" + person._id}>
            <button className="btn btn-circle btn-outline btn-primary btn-sm">
              <svg
                xmlns="http:www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
          </Link>
          <>
            <button
              className="btn btn-circle btn-outline btn-primary btn-sm "
              onClick={handleDelete}
            >
              <svg
                xmlns="http:www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        </th>
      </tr>
    </tbody>
  );
};
export default PersonDetails;
