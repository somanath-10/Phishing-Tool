import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const items = [
  {
    name: "Somanath Reddy",
    rollno: "422256"
  },
  {
    name: "Geetha Sri",
    rollno: "422243"
  },
  
]


function AboutUs() {
  return (


    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100%"
      }}
    >
      <Grid item xs={12}>

      </Grid>
      <Grid Item
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start"
        }}>
        <Grid item xs={6}>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              height: "100%"
            }}
          >
            {items.map((item) => {
              return <Grid item xs={12} sx={{
                width: "100%",
                height: "100%"
              }}>
                <Card sx={{ display: 'flex', margin: "10px", backgroundColor:"#0F1B4C" }} width="100%" >
                  <Box width="100%">
                    <CardContent>
                      <Typography color="#fff" component="div" variant="h5">
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="#fff" component="div">
                        {item.rollno}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>

            })}
          </Grid>

        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12} sx={{
            width: "100%",
            height: "100%"
          }}>
            <Card sx={{ display: 'flex', margin: "10px",backgroundColor:"#0F1B4C" }} width="100%" >
              <Box width="100%">
                <CardContent>
                  <Typography component="div" variant="h5" color="#fff">
                    Mrs.Rani V
                  </Typography>
                  <Typography variant="subtitle1" color="#fff" component="div">
                    Faculty of CSE, NIT AP.
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>

      </Grid>


    </Grid>

  )
}

export default AboutUs