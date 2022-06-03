import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  selectedgenres,
  setSelectedGenres,
  genres,
  SetGenres,
  setPage,
  type,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedgenres, genre]);
    SetGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedgenres.filter((selected) => selected.id !== genre.id)
    );
    SetGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    SetGenres(data.genres);
  };

  console.log(genres);

  useEffect(() => {
    fetchGenres();

    return () => {
      SetGenres([]);
       // eslint-disable-next-line
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedgenres &&
        selectedgenres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: "2", color: "white" }}
            clickable
            onDelete={() => handleRemove(genre)}
            size="medium"
            color="primary"
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: "2", color: "white" }}
            clickable
            size="medium"
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
