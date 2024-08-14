import React, { useState, useEffect } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { Formik } from "formik";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HttpsIcon from "@mui/icons-material/Https";
import IconButton from "@mui/material/IconButton";

import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const apiURL = "http://localhost:5000";

const initialValues = { url: "" };

const userSchema = yup.object().shape({
  url: yup.string().required("required"),
});

function Phishing() {
  const [data, setData] = useState([]);
  const [result, setResult] = useState({
    headers: [],
    rows: [],
  });

  const [res, setRes] = useState("");
  const [lock, setLock] = useState(false);

  const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    height: "100%",
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

  const handleButtonClick = () => {
    const confirmOpen = window.confirm(
      "Are you sure you want to open this URL?"
    );
    if (confirmOpen) {
      window.open(data.url, "_blank");
    }
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    axios
      .post(apiURL + `/testurl`, values)
      .then((response) => {
        console.log(response.data.unsafe_per.toString().includes("e"));
        console.log(response.data.unsafe_per.toString());

        let x = response.data.unsafe_per;
        console.log(x);
        let num = x * 100;
        if (0 <= x && x < 0.5) {
          num = 100 - num;
        }
        let txtx = num.toString();
        if (x <= 1 && x >= 0.5) {
          setRes(" " + txtx + "% safe to use...");
        } else if (0 <= x && x < 0.5) {
          setRes(" " + txtx + "% unsafe to use...");
        }

        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // const submit = fetch(`http://localhost:5000/testurl`, {
    // 'method': 'POST',
    // headers: {
    // 'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(values)
    // })
    // .then(response => console.log(response))
    // .catch(error => console.log(error))
  };

  useEffect(() => {
    axios
      .get(apiURL + `/stats`)
      .then((response) => {
        console.log(response);
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Container>
        <Box sx={{ flex: "1" }}>
          <Title variant="h1">Discover a phishing URL.</Title>
          <Container>
            <Box sx={{ flex: "0.5" }}>
              <Box p="10px">
                <Typography
                  variant="h4"
                  // color={colors.grey[100]}
                  fontWeight="bold"
                  // sx={{ m: "0 0 5px 0" }}
                >
                  Phishing-URL
                </Typography>
              </Box>

              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box m="10px">
                      <TextField
                        fullWidth
                        type="text"
                        label="URL"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.url}
                        name="url"
                        errors={!!touched.url && !!errors.url}
                        helperText={touched.url && errors.url}
                        margin="dense"
                        required
                      />
                    </Box>

                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button
                        type="submit"
                        style={{
                          padding: "6px 16px",
                          borderRadius: "4px",
                          color: "#fff",
                          backgroundColor: "#0F1B4C",
                        }}
                        variant="contained"
                      >
                        Find Out!
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>

            <Box
              sx={{ flex: "0.7" }}
              m="10px"
              style={{
                width: "100%",
                alignItems: "stretch",
                justifyContent: "center",
              }}
            >
              <Flippy
                style={{
                  width: "100%",
                  height: "90%",
                }}
                flipOnHover={lock}
                flipOnClick={true} // default false
                // default false
                flipDirection="horizontal" // horizontal or vertical
              >
                <IconButton
                  aria-label="Example"
                  style={{
                    zIndex: "1",
                    position: "absolute",
                    right: "0",
                    /* width: 20px; */
                    color: lock ? "#FF0000" : "lawngreen",
                    margin: "10px",
                  }}
                  onClick={() => setLock(!lock)}
                >
                  {lock ? <HttpsIcon /> : <LockOpenIcon />}
                </IconButton>

                <FrontSide
                  style={{ backgroundColor: "#41669d", paddingTop: "27px" }}
                >
                  <Box
                    sx={{
                      "& .MuiButtonBase-root": {
                        margin: "auto",
                        width: "100%",
                      },
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Typography
                      variant="h4"
                      p="15px"
                      color="#fff"
                      fontWeight="bold"
                      style={{ fontSize: "1.65rem" }}
                    >
                      Your URL:{" "}
                      <span style={{ fontWeight: "normal" }}> {data.url} </span>
                    </Typography>

                    <Button variant="contained" padding="10px">
                      <Typography
                        variant="h4"
                        color="#0F1B4C"
                        fontWeight="normal"
                        style={{ fontSize: "1.65rem" }}
                      >
                        Your Website is{" "}
                        {res.includes("unsafe") ? (
                          <span
                            style={{ fontWeight: "bold", color: "#f78166" }}
                          >
                            {" "}
                            {res}{" "}
                          </span>
                        ) : (
                          <span
                            style={{ fontWeight: "bold", color: "#4cceac" }}
                          >
                            {res}
                          </span>
                        )}
                      </Typography>
                    </Button>

                    {res.includes("unsafe") ? null : (
                      <Box display="flex" justifyContent="end" mt="20px">
                        <Button
                          type="submit"
                          style={{
                            padding: "6px 16px",
                            borderRadius: "4px",
                            width: "30%",
                            color: "#000000de",
                            backgroundColor:
                              data.safe_per * 100 > data.unsafe_per * 100
                                ? "#4cceac"
                                : "#f78166",
                          }}
                          variant="contained"
                          onClick={handleButtonClick}
                        >
                          Visit Page
                        </Button>
                      </Box>
                    )}
                  </Box>
                </FrontSide>
                <BackSide style={{ backgroundColor: "#175852" }}>
                  {result && (
                    <Table aria-label="simple table" size="small">
                      <TableHead>
                        <TableRow>
                          {result.headers.map((data, index) => (
                            <TableCell key={index}>{data}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.rows.map((row, index) => (
                          <TableRow
                            key={index}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row["ML Model"]}
                            </TableCell>
                            <TableCell align="right">{row.Accuracy}</TableCell>
                            <TableCell align="right">{row.f1_score}</TableCell>
                            <TableCell align="right">{row.Recall}</TableCell>
                            <TableCell align="right">{row.Precision}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </BackSide>
              </Flippy>
            </Box>
          </Container>
        </Box>
      </Container>
    </div>
  );
}

export default Phishing;
