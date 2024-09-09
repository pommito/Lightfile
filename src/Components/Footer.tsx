import { IoLogoGithub } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="flex justify-center w-full h-[5%] mt-auto py-4 px-2">
      <p className="flex items-center gap-3">
        <span>
          Made by{' '}
          <a href="https://www.linkedin.com/in/victor-lebecq-developpeur-react-wordpress-freelance/" className="">
            Victor
          </a>
        </span>
        |
        <a href="https://github.com/pommito/Lightfile" target="blank" className="flex items-center gap-1">
          <IoLogoGithub />
          Github
        </a>
      </p>
    </footer>
  );
};

export default Footer;
