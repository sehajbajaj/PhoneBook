import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !number || !location) {
      setError("Please enter all the fields");
      return;
    }
    const person = { name, number, location };

    // const dupe = persons.find((p) => p.name === person.name);
    // if (dupe) {
    //   alert(`${dupe.name} is already added to phonebook.`);
    //   setName("");
    //   setNumber("");
    //   setLocation("");
    // } else {
    const response = await fetch("/api/persons", {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setNumber("");
      setLocation("");
      setError(null);
      console.log("New Contact added");
      navigate("/");
    }
  };

  return (
    <>
      <br />
      <br />
      <main className="max-w-2xl mx-auto px-5">
        <h1 className="text-4xl font-extrabold py-5 text-center">
          Create New Contact
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="label">
            <span className="label-text text-lg">Name</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className="input input-bordered input-primary w-full"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label className="label">
            <span className="label-text text-lg">Phone Number</span>
          </label>
          <input
            type="text"
            id="number"
            value={number}
            className="input input-bordered input-primary w-full"
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <label className="label">
            <span className="label-text text-lg">Location</span>
          </label>
          <input
            type="text"
            id="location"
            value={location}
            className="input input-bordered input-primary w-full"
            onChange={(e) => setLocation(e.target.value)}
          ></input>

          <button className="btn btn-wide my-5 place-self-center">
            Add Contact
          </button>
          {error && (
            <div className="alert alert-error">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}
        </form>
      </main>
    </>
  );
};

export default NewForm;
