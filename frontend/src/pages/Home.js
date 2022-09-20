import PersonDetails from "../components/PersonDetails";
import { useEffect } from "react";
import { usePersonsContext } from "../hooks/usePersonsContext";

const Home = () => {
  const { dispatch, persons, filtered } = usePersonsContext();

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await fetch("/api/persons");
      const json = await response.json();
      // dispatch({ type: "CLEAR_FILTER" });
      if (response.ok) {
        dispatch({ type: "SET_PERSONS", payload: json });
      }
    };
    fetchPersons();
  }, [dispatch]);
  console.log(filtered);
  console.log(persons);
  return (
    <>
      <br />
      <br />
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          {filtered && filtered !== null
            ? filtered
                .sort((a, b) =>
                  a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
                )
                .map((person) => (
                  <PersonDetails key={person._id} person={person} fil={true} />
                ))
            : persons
                ?.sort((a, b) =>
                  a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
                )
                ?.map((person) => (
                  <PersonDetails key={person._id} person={person} fil={false} />
                ))}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Home;
