import React, { useState, useEffect } from "react";

import Single from "./Single";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=df9bd3ea362371e668bad2d18b02b658&${page}`
    );

    //"https://api.themoviedb.org/3/movie/{movie_id}?api_key=df9bd3ea362371e668bad2d18b02b658");
    const data = await res.json();
    console.log(data.results);
    setContent(data.results);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <span className="pageTitle">
        <h1>Tv Series</h1>
      </span>

      <div className="tranding">
        {content &&
          content.map((c) => (
            <Single
              key={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
    </div>
  );
};
export default Movies;
