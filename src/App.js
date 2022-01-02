import './App.css';
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

import colors from './utils/style/colors';

import Home from './pages/Home';
import Survey from './pages/Survey';
import Freelances from './pages/Freelances';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';
import Profils from './pages/Profils';
import ResultPage from './pages/Results';

import { useState, useEffect } from 'react';
import PageThemeContext from './utils/PageThemeContext';
import SurveyContext from './utils/SurveyContext';

export default function App(){
  const [theme, setTheme] = useState('light');
  const switchTheme = () =>{
    if(theme === 'light'){
      setTheme('dark');
      document.querySelector('body').style.backgroundColor = colors.dark.deepBg ;
      document.querySelector('.themeSwitcher').textContent= '🌙';
      } else {
        setTheme('light');
        document.querySelector('body').style.backgroundColor = colors.light.deepBg ;
        document.querySelector('.themeSwitcher').textContent= '🌞';
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

  const [menu, setMenu] = useState(false);
  function ToggleMenu() {
    document.querySelector('.menuIcon').classList.toggle('change')
    document.querySelector('ul.menu').classList.toggle('menuhidden');
    setMenu(!menu);
    }

  function handleMenu(){
    document.querySelector('.menuIcon').classList.add("change");
    if(menu) ToggleMenu();
  }

  const [answers, setAnswers] = useState([]);

  return (
    <PageThemeContext.Provider value={theme} smh="coucou">
      <SurveyContext.Provider value={{answers:answers, setAnswers:setAnswers}} >
        <Router basename="/notarealagency">
          <div className="main" onClick={handleMenu}>
            <Header switchTheme={switchTheme} ToggleMenu={ToggleMenu} menu={menu} setMenu={setMenu} />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/survey/:questionNumber">
                <Survey />
              </Route>
              <Route exact path="/survey">
                <Survey />
              </Route>
              <Route path="/freelances">
                <Freelances />
              </Route>
              <Route path="/profils/:id">
                <Profils />
              </Route>
              <Route path="/results">
                <ResultPage />
              </Route>
              <Route path="/*">
                <ErrorPage/>
              </Route>
              
            </Switch>
          </div>
        </Router>
    </SurveyContext.Provider>
    </PageThemeContext.Provider>


  );
}
