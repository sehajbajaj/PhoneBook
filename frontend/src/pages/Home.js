import PersonDetails from "../components/PersonDetails";
import { useEffect, useState } from "react";

const Home = () => {
  const [persons, setPersons] = useState([]);
  const [filters, setFilters] = useState("");
  const [searchElement, setSearchElement] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await fetch("/api/persons");
      const json = await response.json();
      if (response.ok) {
        setPersons(json);
      }
    };
    fetchPersons();
  }, []);

  useEffect(() => {
    handleReset();
  }, []);

  const onFilter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = persons.filter((person) => {
        return person.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setSearchElement(results);
    } else {
      setSearchElement(keyword);
    }
    setFilters(keyword);
  };

  const handleDeleteSearch = async (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const response = await fetch("/api/persons/" + person._id, {
        method: "DELETE",
      });
      if (!response.ok) {
        alert(`${person.name} is already deleted from the phonebook!`);
      }
      if (response.ok) {
        setSearchElement((prev) => {
          return prev.filter((jk) => jk._id !== person._id);
        });
        setPersons((prev) => {
          return prev.filter((jk) => jk._id !== person._id);
        });
        console.log(searchElement);
      }
    }
  };

  const handleDelete = async (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const response = await fetch("/api/persons/" + person._id, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert(`${person.name} is already deleted from the phonebook!`);
      }

      if (response.ok) {
        setPersons((prev) => {
          return prev.filter((jk) => jk._id !== person._id);
        });
      }
    }
  };

  const handleReset = () => {
    setFilters(() => "");
  };
  return (
    <>
      <br />
      <div className="flex">
        <input
          type="search"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs"
          value={filters}
          onSubmit={(event) => event.preventDefault()}
          onChange={onFilter}
        />
        {/* <button onClick={handleReset} className="btn btn-wide ml-5">
          RESET
        </button> */}
      </div>
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
          {filters !== ""
            ? searchElement
                .sort((a, b) =>
                  a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
                )
                .map((person) => (
                  <PersonDetails
                    key={person._id}
                    person={person}
                    fil={true}
                    handleDeleteSearch={handleDeleteSearch}
                    handleDelete={handleDelete}
                  />
                ))
            : persons
                ?.sort((a, b) =>
                  a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
                )
                ?.map((person) => (
                  <PersonDetails
                    key={person._id}
                    person={person}
                    fil={false}
                    handleDeleteSearch={handleDeleteSearch}
                    handleDelete={handleDelete}
                  />
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
