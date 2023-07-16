import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyAccount({ user }) {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch(
      `https://squatch-spotter-server.onrender.com/users/${user.id}/sightings`
    )
      .then((response) => response.json())
      .then((data) => {
        setSightings(data);
      })
      .catch((error) => {
        console.error("Error fetching user sightings: ", error);
      });
  }, [user.id]);

  const handleDeleteSighting = (sightingId) => {
    fetch(
      `https://squatch-spotter-server.onrender.com/sightings/${sightingId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then(() => {
        // Remove the deleted sighting from the state
        setSightings((prevSightings) =>
          prevSightings.filter((sighting) => sighting.id !== sightingId)
        );
      })
      .catch((error) => {
        console.error("Error deleting sighting: ", error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto mt-40">
      <h2 className="text-3xl font-bold mb-4">My Account</h2>
      <div className="bg-stone-200 shadow-inherit overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-green-800">
            User Information
          </h3>
          <div className="mt-4">
            <p className="text-sm leading-6 font-medium text-green-600">
              Email: {user.email}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-4">My Sightings</h3>
        {sightings.length > 0 ? (
          <div className="space-y-4">
            {sightings.map((sighting) => (
              <div
                key={sighting.id}
                className="bg-stone-200 shadow-inherit overflow-hidden sm:rounded-lg"
              >
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-green-800">
                    {sighting.location.name}, {sighting.location.state}
                  </h3>
                  <h4 className="text-sm leading-6 font-medium text-green-600">
                    {new Date(sighting.sighting_date).toLocaleDateString()}
                  </h4>
                  <p className="mt-1 max-w-2xl text-sm text-green-1000">
                    {sighting.description}
                  </p>
                  <Link to={`/sightings/${sighting.id}`}>
                    <button className="mt-3 w-full px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none">
                      Sighting Details
                    </button>
                  </Link>
                  <div className="flex justify-end mt-2">
                    <Link
                      to={`/sightings/${sighting.id}/edit`}
                      className="mr-2"
                    >
                      <button className="px-4 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="px-4 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
                      onClick={() => handleDeleteSighting(sighting.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-green-800">You haven't made any sightings yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyAccount;
