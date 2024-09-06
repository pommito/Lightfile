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
    <header className="flex flex-row justify-between items-center px-8 py-6 border border-red-500">
      <span className="text-2xl">LOGO</span>
      <button onClick={handleThemeSwitch}>
        {theme === 'light' ? <MdOutlineLightMode className="size-6" /> : <MdOutlineDarkMode className="size-6" />}
      </button>
    </header>
  );
};

export default Header;
