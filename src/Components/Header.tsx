import { useState } from 'react';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';

const Header = () => {
  const [theme, setTheme] = useState('dark');

  const handleThemeSwitch = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <header className="flex flex-row h-[10vh] justify-between items-center px-20 py-6">
      <span className="text-2xl">LOGO</span>
      <button className=" hover:bg-slate-800 rounded-lg px-3 py-3 text-sm" onClick={handleThemeSwitch}>
        {theme === 'light' ? <MdOutlineLightMode className="size-5" /> : <MdOutlineDarkMode className="size-5" />}
      </button>
    </header>
  );
};

export default Header;
