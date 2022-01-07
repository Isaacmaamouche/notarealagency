import { useState, createContext, useEffect } from "react";
import colors from "./style/colors";

export const PageThemeContext = createContext();
export default function PageTheme({children}){

    const [theme, setTheme] = useState('light');
    const switchTheme = () =>{
    let bodyBg = document.querySelector('body').style.backgroundColor;
      if(theme === 'light'){
        setTheme('dark');
        bodyBg = colors.dark.deepBg ;
        } 
      else {
        setTheme('light');
        bodyBg = colors.light.deepBg ;
        };    
      }
  
    useEffect(() => {
      if(localStorage.getItem('storedtheme') !== null){        
          let storedtheme = localStorage.getItem('storedtheme');
          setTheme(JSON.parse(storedtheme));
      }else{setTheme('light');}
    // eslint-disable-next-line
    }, []);
  
    useEffect(() => {
      let JSONtheme = JSON.stringify(theme); 
      localStorage.setItem('storedtheme', JSONtheme);
    }, [theme]);
  
    document.querySelector('body').style.backgroundColor = colors[theme].deepBg ;
  
    return(
        <PageThemeContext.Provider value={{theme, switchTheme}}>
            {children}
        </PageThemeContext.Provider>
    )
};