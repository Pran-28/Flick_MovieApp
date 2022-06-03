import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Tab, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

import axios from "axios";
const Search = () => {
  const [search, setSearch] = useState(0);
  const[page, setPage] = useState(1);
  const[searchText, SetsearchText] = useState("");
  const[content, Setcontent] = useState()
  const[numofPages, SetnumofPages] = useState()

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () =>{
      const {data} = await axios.get(`https://api.themoviedb.org/3/search/${search ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}`);

      Setcontent(data.results)
      SetnumofPages(data.pages)

  };

  useEffect(() =>{
    window.scrollTo(0,0);
    fetchSearch();
    //eslint-disable-next-line
  }, [search, page])
  

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Box
          style={{ display: "flex" }}
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            style={{ display: "flex",width:'100%', 
            margin: '15px 0'}}
            required
            className="searchBox"
            id="outlined-required"
            label="Search"
            variant="filled"
            onChange={(e) => SetsearchText(e.target.value)}
          />

          <Button variant="contained" style={{ marginLeft: "10"  }} onClick={fetchSearch}>
            <SearchIcon fontSize="small" />
          </Button>
        </Box>
        <Tabs style={{paddingBottom: 5}} value={search} indicatorColor="primary" textColor="primary"
        onChange={(event, newValue)=>{
          setSearch(newValue);
          setPage(1);
        }}>
          
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Tv Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={search ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
          {searchText && 
              !content && 
              (search ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numofPages > 1 && (
        <CustomPagination setPage={setPage} numofPages={numofPages}/>
      )}
    </div>

  );
};

export default Search;
