import React from 'react';
import { IoLogoGithub } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="flex justify-center w-full h-[5%] py-4 px-2">
      <p className="flex items-center gap-3">
        <span>
          Made by{' '}
          <a href="#" className="">
            Victor
          </a>
        </span>
        |
        <a href="#" className="flex items-center gap-1">
          <IoLogoGithub />
          Github
        </a>
      </p>
    </footer>
  );
};

export default Footer;
