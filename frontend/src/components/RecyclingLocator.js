import { useEffect } from "react";

function RecyclingLocator() {
  useEffect(() => {
    window.open("https://www.google.com/maps/search/recycling+centers+near+me", "_blank");
  }, []);

  return <p>Opening Google Maps...</p>;
}

export default RecyclingLocator;
