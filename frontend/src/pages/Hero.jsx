import React from 'react'
import Home from './Home'
import About from '../components/ui/Aboutus'
import HorizontalScroll from '../components/ui/HorizontalScroll'
import Videozoom from '../components/ui/Videozoom'
import ProjectsSection from '../components/ui/Projectsection'
import DiscoverLife from '../components/ui/DiscoverLife'
import Contactus from '../components/ui/Contactus'
const Hero = () => {
    return (
        <>
            <Home />
            <About />
            <HorizontalScroll />
            <Videozoom />
            <ProjectsSection />
            <DiscoverLife />
            <Contactus />
        </>
    )
}

export default Hero