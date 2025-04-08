import React from 'react'
import HeroSection2 from '../Components/AboutPage/HeroSection2'
import BrandPhilosophy from '../Components/AboutPage/BrandPhilosophy'
import FoundersStory from '../Components/AboutPage/FoundersStory'
import Craftsmanship from '../Components/AboutPage/craftsmanshipItems'
import Testimonials from '../Components/AboutPage/testimonials'

export const About = () => {
  return (
    <div>
      <HeroSection2 />
      <FoundersStory />
      <Craftsmanship />
      <BrandPhilosophy />
      <Testimonials />
    </div>
  );
}
