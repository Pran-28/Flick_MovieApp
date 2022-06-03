import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
  },
});

const CustomPagination = ({ setPage, numofPages = 10 }) => {
  const handlepagechange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
      color:"white"
    }}>
      <ThemeProvider theme={theme}>
        <Stack spacing={2}>
          <Pagination 
            count={numofPages}
            onChange={(e) => handlepagechange(e.target.textContent)}
            hideNextButton
            hidePrevButton
            color="primary"
          />
        </Stack>
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
