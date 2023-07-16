import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function EditSighting() {
  const history = useHistory();
  const { id } = useParams();
  const [locationName, setLocationName] = useState("");
  const [locationState, setLocationState] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [sightingDate, setSightingDate] = useState("");
  const [sightingTime, setSightingTime] = useState("");
  const [sightingDescription, setSightingDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://squatch-spotter-server.onrender.com/sightings/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLocationName(data.location.name);
        setLocationState(data.location.state);
        setLocationDescription(data.location.description);
        setSightingDate(data.sighting_date);
        setSightingTime(data.sighting_time);
        setSightingDescription(data.description);
      })
      .catch((error) => {
        console.error("Error fetching sighting data: ", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = new Date(sightingDate).toISOString().split("T")[0];
    const [hours, minutes] = sightingTime.split(":");
    const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}`;

    fetch(`https://squatch-spotter-server.onrender.com/sightings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: {
          name: locationName,
          state: locationState,
          description: locationDescription,
        },
        sighting_date: formattedDate,
        sighting_time: formattedTime,
        description: sightingDescription,
      }),
    })
      .then((response) => {
        if (response.ok) {
          history.push(`/sightings/${id}`);
        } else {
          setError("Error updating the sighting");
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error updating the sighting: ", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Edit Sighting
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSighting;
