import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from '../../components/Genres';
import useGenres from '../../HOOKS/useGenre';

const Movies = () => {
  const[page, setPage ] = useState(1);
  const[content, setContent] = useState([]);
  const[numofPages, setnoofPages] = useState();
  const[selectedgenres, setSelectedGenres] =  useState([]);
  const[genres, SetGenres] = useState([])

  const genreforURL = useGenres(selectedgenres);

  const fetchMovies = async () =>{
   const {data} =  await axios.get(`
   https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)

  setContent(data.results)
  setnoofPages(data.total_pages)
   console.log(data)
  };


  useEffect(() =>{
    fetchMovies();
    // eslint-disable-next-line 
  },[page, genreforURL])


  return (
    <div>
         <span className="pageTitle">Movies</span>
         <Genres type="movie" selectedgenres={selectedgenres} setSelectedGenres={setSelectedGenres}  genres={genres} SetGenres={SetGenres} setPage={setPage}/>
         <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type='movie'
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numofPages > 1 && (
           <CustomPagination setPage={setPage} numofPages={numofPages}/>
      )}
     
    </div>
   
  )
}

export default Movies
