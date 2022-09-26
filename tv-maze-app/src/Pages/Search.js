import {
  Tabs,
  Tab,
  createMuiTheme,
  TextField,
  ThemeProvider
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Single from "./Single";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchBox, setSearchBox] = useState("");
  const [content, setContent] = useState([]);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff"
      }
    }
  });

  const searchApi = async () => {
    const res = await fetch(
      ` https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=df9bd3ea362371e668bad2d18b02b658&language=en-US
&page=${page}&query=${searchBox}&include_adult=false`
    );
    const data = await res.json();
    console.log(data.results);
    setContent(data.results);
  };
  useEffect(() => {
    searchApi();
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchBox(e.target.value)}
          />
          <button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={searchApi}
          >
            <SearchIcon />{" "}
          </button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

      <div className="tranding">
        {content &&
          content.map((c) => (
            <Single
              key={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}

        {searchBox &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
    </div>
  );
};
export default Search;
