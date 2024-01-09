import React from 'react'
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { GiStrawberry } from "react-icons/gi";

const Footer = () => {
  return (
    // <footer className='absolute inset-x-0 bottom-0 py-3'>
    <footer className='inset-x-0 bottom-0 py-3'>
      <div className='grid grid-flow-col auto-cols-max gap-2 justify-end '>
        <a href='https://www.linkedin.com/in/hoi-lam-wong-05b05528a/' target="_blank" className='hover:text-darkLamon/80'><FaLinkedin size={30}/> </a>
        <a href='https://github.com/hoilamwong/shopping-list' target="_blank" className='hover:text-darkLamon/80'><FaGithub size={30}/> </a>
        <a href='https://3d-strawberry-cake.vercel.app/' target="_blank" className='hover:text-darkLamon/80'><GiStrawberry size={30}/></a>
      </div>
    </footer>
  )
}

export default Footer
