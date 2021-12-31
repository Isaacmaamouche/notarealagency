import { useState, createContext } from 'react';

export default function Context(){
    const [theme, setTheme] = useState('light-mode');
    const switchTheme = () =>{
        theme === 'light-mode' ? setTheme('dark-mode') : setTheme('light-mode');
    };
    const PageThemeContext = createContext(null);
    return PageThemeContext;
}