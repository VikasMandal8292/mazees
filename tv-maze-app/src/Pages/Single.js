import React from "react";
import "./Single.css";
const Single = ({ id, key, poster, title, date, media_type, vote_average }) => {
  return (
    <div className="single">
      <img
        className="image"
        src={
          poster
            ? `https://image.tmdb.org/t/p/w300/${poster}`
            : "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
        }
        alt={title}
      />
      <b className="title"> {title} </b>
      <span className="subTitle">
        {media_type === "tv" ? "Tv series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </div>
  );
};
export default Single;
