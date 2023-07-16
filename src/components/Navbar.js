import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Navbar({ loggedIn, onLogout }) {
  const history = useHistory();

  function handleLogout() {
    fetch("https://sqautch-spotter-server.onrender.com/logout", {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          onLogout(); // Call the onLogout function from the parent component
          history.push("/");
        }
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  }

  return (
    <nav className="bg-green-800 p-5 mt-0 fixed w-full z-10 top-0">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
          <Link
            to="/"
            className="text-white no-underline hover:text-yellow-300 hover:no-underline"
          >
            <span className="text-2xl pl-2">
              <i className="em em-grinning"></i> Squatch Spotter
            </span>
          </Link>
        </div>

        <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li className="mr-3">
              <Link
                className="inline-block text-white no-underline hover:text-yellow-300 hover:text-underline py-2 px-4"
                to="/report-sighting"
              >
                Report Sighting
              </Link>
            </li>
            {loggedIn ? (
              <>
                <li className="mr-3">
                  <Link
                    className="inline-block text-white no-underline hover:text-yellow-300 hover:text-underline py-2 px-4"
                    to={`/users/${loggedIn.id}`}
                  >
                    My Account
                  </Link>
                </li>
                <li className="mr-3">
                  <button
                    onClick={handleLogout}
                    className="inline-block text-white no-underline hover:text-yellow-300 hover:text-underline py-2 px-4"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mr-3">
                  <Link
                    className="inline-block text-white no-underline hover:text-yellow-300 hover:text-underline py-2 px-4"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    className="inline-block text-white no-underline hover:text-yellow-300 hover:text-underline py-2 px-4"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
