import {Link} from "react-router-dom";
import styled from "styled-components";
import {createGlobalStyle} from "styled-components";
import colors from "../../utils/style/colors";
import LinkButton from "../LinkButton";
import { useContext } from "react";
import {PageThemeContext} from '../../utils/PageThemeContext';
import LightLogo from '../../assets/light-logo.png';
import DarkLogo from '../../assets/dark-logo.png';

const StyledLink = styled(Link)`
    padding:15px;
    color:${props => colors[props.theme].secondary};
    transition:0.3s ease all;
    &:hover{
        color:${props => colors[props.theme].primary};
    }
    text-decoration:none;
    font-size:1rem;
    white-space: nowrap;
    `;

const StyledUl = styled.ul`
    padding:2rem 2rem 0rem 2rem;
    list-style:none;
    display:flex;
    flex-direction:row;
    justify-content: flex-end;
    align-items: center;
    @media (max-width:768px){
        position: fixed;
        top: -1rem;
        right: 0;
        z-index: 1;
        display:flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        padding-top: 4rem;
        background-color: ${props => colors[props.theme].mainBg};
        height: 100vh;
        transform: translateX(100%);
        transition: 0.3s all ease;
        &.menuhidden{
            transform: translateX(0%);
        }
        li{
            margin-bottom:0.5rem;
            flex:0;
            @media (pointer:coarse) {  
                margin-bottom: 1.5rem;
                transform: scale(1.3);
            }
        }
        }
    `;

const StyledLogo = styled.li`
    flex:1;
    `;

const GlobalHeaderStyle = createGlobalStyle`
nav {
    position: relative;
  }
  .menuIcon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: 769px) {
      display: none;
    }
    cursor: pointer;
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1;
    width: 30px;
    height: 30px;
    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      background-color: #5843e4;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      transform: translate(-50%, -50%);

    }
  }

  .bar1,.bar2,.bar3 {
    z-index: 1;
    width: 15px;
    height: 2px;
    background-color: white;
    margin: 2px auto;
    transition: 0.3s;
    pointer-events: none;
  }

  .change .bar1 {
    transform: rotate(-45deg) translate(-4px, 4px);
  }
  .change .bar2 {
    opacity: 0;
  }
  .change .bar3 {
    transform: rotate(45deg) translate(-4px, -5px);
  }
  `;


export default function Header(props){
    const {theme, switchTheme} = useContext(PageThemeContext);
    
    return (
        <>
        <nav>
            <StyledUl className={props.menu===true? `menu menuhidden` : `menu`} theme={theme}  onClick={props.handleMenu}>
                <StyledLogo>
                    <Link to='/' ><img src={theme === 'light' ? LightLogo : DarkLogo} alt="logo Shiny" /></Link>
                </StyledLogo>
                <li>
                    <StyledLink to="/" theme={theme} >Accueil</StyledLink>
                </li>
                <li>
                    <StyledLink to="/freelances" theme={theme} >Profils</StyledLink>
                </li>
                <li>
                    <LinkButton value="Faites le test" link="/survey" />
                </li>
                <li>
                    <StyledLink to="#" theme={theme} onClick={switchTheme}>
                        {theme==='light'?'🌙':'🌞'}
                    </StyledLink>
                </li>
            </StyledUl>
        </nav>

        <GlobalHeaderStyle />
        <div className="menuIcon" onClick={props.ToggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
        </>


    )
};

