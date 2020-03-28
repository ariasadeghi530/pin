import React, {useContext} from 'react';
import HomePageCard from '../../HomePageCard';
import Footer from '../../Footer';
import UserContext from '../../../utils/UserContext';

function HomePage() {
  return(
    <>
   
      
      <HomePageCard />
      {/* <HomePageCard />
      <HomePageCard />
      <HomePageCard /> */}
      <Footer />
    </>

  );
}

export default HomePage;