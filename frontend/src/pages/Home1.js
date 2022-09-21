import PersonDetails from "../components/PersonDetails";
import { useEffect, useState } from "react";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [storeFilter, setStoreFilter] = useState([]);
  const [persons, setPersons] = useState([]);

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

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);

    if (searchValue !== "") {
      const result = persons.filter((person) => {
        return person.name.toLowerCase().startsWith(searchValue.toLowerCase());
      });
      setStoreFilter(result);
    }
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
        setStoreFilter((prev) => {
          return prev.filter((jk) => jk._id !== person._id);
        });
        setPersons((prev) => {
          return prev.filter((jk) => jk._id !== person._id);
        });
        console.log(storeFilter);
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
    setSearchValue(() => "");
  };
  return (
    <>
      <br />
      <div className="flex">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs"
          value={searchValue}
          onChange={handleSearch}
        />
        <button onClick={handleReset} className="btn btn-wide ml-5">
          RESET
        </button>
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
          {searchValue && searchValue !== ""
            ? storeFilter
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
