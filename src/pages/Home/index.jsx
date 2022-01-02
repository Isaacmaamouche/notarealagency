import styled from "styled-components";
import colors from "../../utils/style/colors";
import LinkButton from '../../components/LinkButton';
import { useContext } from "react";
import PageThemeContext from "../../utils/PageThemeContext";
import Spacer from "../../components/Spacer";
import HomeVisual from '../../assets/home-illustration.svg';

import LightLogo from '../../assets/light-logo.png';
import DarkLogo from '../../assets/dark-logo.png';

const StyledHome = styled.div`
  display:grid;
  gap: 1rem;
  grid-template-columns: repeat(6,1fr);
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;
  div:first-child{
    grid-column:1/4;
    @media (max-width:1024px){
      grid-column:1/5;
    }
  }
  div:last-child{
    grid-column:5/7;
  }

  background-color:${props => colors[props.theme].mainBg};
  margin: 0 3rem;
  padding:4rem;
  h1{
    color: ${props => colors[props.theme].contrast};
    margin-bottom: 2rem;
    font-size: 1.5rem;
    line-height: 2.5rem;
    }
  }

  @media (max-width:768px){
    margin: 0 1rem;
    padding:1rem;
    text-align:center;
    div:first-child{
      grid-column:1/7;
      grid-row: 2;
    }
    div:last-child{
      grid-column:3/5;
      grid-row: 1;
    }
  }
`;

const MobileLogo = styled.div`
  display:none;
  @media (max-width:768px){
    display:block;
    img{
      display:block;
      margin:auto;
    }
  }
`;

export default function Home() {
  const theme = useContext(PageThemeContext);
    return (
      <><Spacer />
      <MobileLogo>
      <img src={theme === 'light' ? LightLogo : DarkLogo} alt="logo Shiny" />
      <Spacer />
      </MobileLogo>
      <StyledHome theme={theme}>
        <div>
          <h1>
            Repérez vos besoins,<br />
            on s’occupe du reste,<br />
            avec les meilleurs talents.
          </h1>
          <LinkButton value="Faire le test" link="/survey" />
        </div>

        <div><img src={HomeVisual} alt="Home illustration" width='100%' /></div>

      </StyledHome></>
    )
  }
  
