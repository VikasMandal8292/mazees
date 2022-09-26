import React from "react";
import Single from "./Single";
import "./Trending.css";
import { useEffect, useState } from "react";

const Trending = () => {
  //  const [input, setInput] = useState('');
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    let response = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=df9bd3ea362371e668bad2d18b02b658"
    );

    let data = await response.json();
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div>
      <span className="pageTitle">
        <h1>Popular</h1>
      </span>
      <div className="tranding">
        {content &&
          content.map((c) => (
            <Single
              key={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default Trending;
