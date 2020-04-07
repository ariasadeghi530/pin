import React from 'react';
import HomePageCard from '../../HomePageCard';
import Footer from '../../Footer';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  contain: {
   paddingTop: "4rem",
   paddingRight: 0,
   paddingLeft: 0,
  },
}))

function HomePage() {
  const classes = useStyles();

  return(
    <>
   <Container className={classes.contain}>
      <HomePageCard />
      <Footer />
   </Container>
      
    </>

  );
}

export default HomePage;