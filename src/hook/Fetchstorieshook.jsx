import { useState, useEffect } from "react";

const url = "https://mxpertztestapi.onrender.com/api/sciencefiction";
const LIMIT = 12;

function useFetchStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function loadStories() {
      try {
        const res = await fetch(url);
        const data = await res.json();

       
        const limitedStories = (data || [])

        setStories(limitedStories);

        console.log(limitedStories);
        console.log(limitedStories[0]?.Status);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    }

    loadStories();
  }, []);

  return stories;
}

export default useFetchStories;
