import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function ReportSighting({ loggedIn, user }) {
  const history = useHistory();
  const [locationName, setLocationName] = useState("");
  const [locationState, setLocationState] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [sightingDate, setSightingDate] = useState("");
  const [sightingTime, setSightingTime] = useState("");
  const [sightingDescription, setSightingDescription] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    let response = await fetch(
      "https://sqautch-spotter-server.onrender.com/locations",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: locationName,
          state: locationState,
          description: locationDescription,
        }),
      }
    );

    if (!response.ok) {
      setError(`Error: ${response.statusText}`);
      return;
    }

    let locationData = await response.json();

    response = await fetch(
      "https://sqautch-spotter-server.onrender.com/sightings",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          location_id: locationData.id,
          sighting_date: sightingDate,
          sighting_time: sightingTime,
          description: sightingDescription,
        }),
      }
    );

    if (!response.ok) {
      setError(`Error: ${response.statusText}`);
      return;
    }

    let sightingData = await response.json();

    setLocationName("");
    setLocationState("");
    setLocationDescription("");
    setSightingDate("");
    setSightingTime("");
    setSightingDescription("");
    setError("");

    history.push(`/sightings/${sightingData.id}`);
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Please log in to report a sighting
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/signup"
                className="font-medium text-green-600 hover:text-green-500"
              >
                sign up for a new account
              </Link>
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              to="/login"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Report a new Sighting
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="location-name" className="sr-only">
                Location Name
              </label>
              <input
                id="location-name"
                name="location-name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Location Name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location-state" className="sr-only">
                Location State
              </label>
              <input
                id="location-state"
                name="location-state"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Location State"
                value={locationState}
                onChange={(e) => setLocationState(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location-description" className="sr-only">
                Location Description
              </label>
              <input
                id="location-description"
                name="location-description"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Location Description"
                value={locationDescription}
                onChange={(e) => setLocationDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sighting-date" className="sr-only">
                Sighting Date
              </label>
              <input
                id="sighting-date"
                name="sighting-date"
                type="date"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                value={sightingDate}
                onChange={(e) => setSightingDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sighting-time" className="sr-only">
                Sighting Time
              </label>
              <input
                id="sighting-time"
                name="sighting-time"
                type="time"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                value={sightingTime}
                onChange={(e) => setSightingTime(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sighting-description" className="sr-only">
                Sighting Description
              </label>
              <textarea
                id="sighting-description"
                name="sighting-description"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Sighting Description"
                value={sightingDescription}
                onChange={(e) => setSightingDescription(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Report Sighting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportSighting;
