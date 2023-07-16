import React from "react";
import { Link } from "react-router-dom";

function SightingCard({ sighting, comments }) {
  return (
    <div className="bg-stone-200 shadow-inherit overflow-hidden sm:rounded-lg max-w-lg mx-auto">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-green-800">
          {sighting.location.name}, {sighting.location.state}
        </h3>
        <h4 className="text-sm leading-6 font-medium text-green-600">
          {new Date(sighting.sighting_date).toDateString()}
        </h4>
        <p className="mt-1 max-w-2xl text-sm text-green-1000">
          {sighting.description}
        </p>
        <Link to={`/sightings/${sighting.id}`}>
          <button className="mt-3 w-full px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none">
            Sighting Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SightingCard;
