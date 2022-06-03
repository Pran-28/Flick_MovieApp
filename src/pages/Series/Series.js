import React, {useState, useEffect} from 'react'
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import axios from 'axios';
import useGenres from '../../HOOKS/useGenre';
import Genres from '../../components/Genres';
const Series = () => {
  const[page, setPage ] = useState(1);
  const[content, setContent] = useState([]);
  const[numofPages, setnoofPages] = useState();
  const[selectedgenres, setSelectedGenres] =  useState([]);
  const[genres, SetGenres] = useState([])

  const genreforURL = useGenres(selectedgenres);

  
  const fetchSeries = async () =>{
    const {data} =  await axios.get(`
    https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
 
   setContent(data.results)
   setnoofPages(data.total_pages)
    console.log(data)
   };
 
 
   useEffect(() =>{
     fetchSeries();
      // eslint-disable-next-line 
   },[page, genreforURL])
 
  return (
    <div>
             <span className="pageTitle">Series</span>
             <Genres type="tv" selectedgenres={selectedgenres} setSelectedGenres={setSelectedGenres}  genres={genres} SetGenres={SetGenres} setPage={setPage}/>
    <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage}/>
    </div>
    
  )
}

export default Series
