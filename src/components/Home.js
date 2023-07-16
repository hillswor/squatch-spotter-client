import React, { useEffect, useState } from "react";
import SightingCard from "./SightingCard";

function Home() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("https://squatch-spotter-server.onrender.com/sightings")
      .then((response) => response.json())
      .then((data) => setSightings(data));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-16 mt-20">
      {sightings.map((sighting) => (
        <SightingCard
          key={sighting.id}
          sighting={sighting}
          comments={sighting.comments}
        />
      ))}
    </div>
  );
}

export default Home;
