import './App.css';
import {
  BrowserRouter as Router,
  //HashRouter,
  Switch,
  Route
} from "react-router-dom";
import Test from './Test';
import React from 'react';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Freelances from './pages/Freelances';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';
import Profils from './pages/Profils';
import ResultPage from './pages/Results';

import { useState } from 'react';
import PageTheme from './utils/PageThemeContext';
import SurveyContext from './utils/SurveyContext';

export default function App(){
 
  const [menu, setMenu] = useState(false);
  function ToggleMenu() {
    document.querySelector('.menuIcon').classList.add('change')
    document.querySelector('ul.menu').classList.toggle('menuhidden');
    setMenu(!menu);
    }

  function handleMenu(e){
    if(menu) {
      ToggleMenu();
      document.querySelector('.menuIcon').classList.remove("change");
    };
  }

  const [answers, setAnswers] = useState([]);

  const isConnected= 'ccccc';
  return (
    <PageTheme>
      <Test isConnected={isConnected}/>
      <SurveyContext.Provider value={{answers:answers, setAnswers:setAnswers}} >
        <Router basename="/notarealagency">
          <div className="main" onClick={handleMenu}>
            <Header ToggleMenu={ToggleMenu} menu={menu} setMenu={setMenu} />
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
            {/* <Footer/> */}
          </div>
        </Router>
    </SurveyContext.Provider>
    </PageTheme>


  );
}
