import React from 'react'
import { Box, styled, Typography } from "@mui/material";
import PhishingImg from '../assests/phishing.jpg';
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Main() {
  const navigate = useNavigate();

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));
  return (
    <CustomBox sx={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <Box sx={{
        flex: "1"
      }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "18px",
            color: "#687690",
            fontWeight: "500",

          }}
        >
          Welcome to Phishing Url Detector
        </Typography>
        <Title variant="h1">
        Discover a Phishing URLS.

        </Title>
        <Typography
          variant="body2"
          sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
        >
          This website detect whether the given input url is phishing or legitimate. As we know that phishing website 
          is a website which is similar in name and
          appear to be an official website otherwise it is known as a spoofed website which is created to
          fool an individual and steal their personal credentials.
        </Typography>
        
        <Button variant="contained"
         sx={{
          backgroundColor:"#0F1B4C",
          color:"#fff",
         "&:hover": {
          backgroundColor: "#fff",
          color: "#0F1B4C",
          borderColor: "#0F1B4C"}
        }}
          onClick={()=> navigate("/phishingurldetection")}
          
        >Get Started</Button>
      </Box>

      <Box sx={{ flex: "1.25" }}>
        <img
          src={PhishingImg}
          alt="phishingImg"
          style={{ maxWidth: "100%", width: "500px", borderRadius: "160px", marginBottom: "2rem" }}
        />
      </Box>
    </CustomBox >
  )
}
export default Main