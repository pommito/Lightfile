import { useState } from 'react';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeSwitch = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <header className="flex flex-row h-[10vh] justify-between items-center px-20 py-6">
      <span className="text-2xl">Lightfile</span>
      <button
        className=" hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg px-3 py-3 text-sm"
        onClick={handleThemeSwitch}
      >
        {darkMode ? <MdOutlineLightMode className="size-5" /> : <MdOutlineDarkMode className="size-5" />}
      </button>
    </header>
  );
};

export default Header;
