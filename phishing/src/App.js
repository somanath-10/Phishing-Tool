import { Box} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./components/NavBar";
import Main from "./components/Main";

import { Routes, Route } from "react-router-dom";
import Phishing from "./components/Phishing";
import AboutUs from "./components/AboutUs";
// import AppImg from "../media/App_illustration.png";

const App = () => {
  

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "100vh" }}>
      <Container>
        <Navbar />
        <Box>
          {/* <Phishing/> */}

          <Routes>
              <Route exact path="/phishingurldetection" element={ <Phishing/>}/>
              <Route exact path="/" element={ <Main/>}/>
              <Route exact path="/aboutus" element={<AboutUs/>}/>
            </Routes>
        </Box>
     
      </Container>
    </Box>
  );
};

export default App;