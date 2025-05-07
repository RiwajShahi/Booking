import React from 'react'
import Hero from './Hero'
import Footer from './Footer';

const HomePage = () => {
  const handleButtonClick = () => {
    alert('Button clicked!');
    // Add your desired action here
  };
  return (
    <div>
      <Hero
        title="Your Dream House Party Starts Here"
        subtitle="Find the perfect venue for your unforgettable celebration."
        image="./images/hero-background.jpg" // Replace with your actual image path
        buttonText="Browse Venues"
        onButtonClick={handleButtonClick}/>

        <Footer/>
        
      
    </div>
   
  )
}

export default HomePage;