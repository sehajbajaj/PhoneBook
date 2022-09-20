import { Link } from "react-router-dom";
import { useState } from "react";
import { usePersonsContext } from "../hooks/usePersonsContext";

const Navbar = () => {
  const { dispatch } = usePersonsContext();
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    const keyword = e.target.value;
    setSearchValue(keyword);
    // console.log(searchValue);

    if (searchValue !== "") {
      dispatch({ type: "FILTER_BLOGS", payload: searchValue });
    } else {
      dispatch({ type: "CLEAR_FILTERS" });
    }
    // const keyword = e.target.value;

    // if (keyword !== "") {
    //   const result = persons.filter((person) => {
    //     return person.name.toLowerCase().startsWith(keyword.toLowerCase());
    //   });
    //   setSearchElement(result);
    // } else {
    //   setSearchElement(keyword);
    // }
    // setFilter(keyword);
  };
  return (
    <header>
      <nav>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </Link>
                </li>

                <li>
                  <Link to="/newcontact">Create New Contact</Link>
                </li>
              </ul>
            </div>

            <Link to="/" className="normal-case text-4xl">
              <strong>PhoneBook</strong>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link to="/newcontact">Create New Contact</Link>
              </li>
            </ul>
          </div>
          <div className=" navbar-end form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered mr-0"
              value={searchValue}
              onChange={onChange}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
