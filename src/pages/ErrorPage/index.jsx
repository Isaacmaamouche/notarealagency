import styled from "styled-components";
import colors from "../../utils/style/colors";
import PageThemeContext from "../../utils/PageThemeContext";
import { useContext } from "react";
import Spacer from "../../components/Spacer";

import ErrorIllustration from '../../assets/404.svg';

const StyledErrorPage = styled.div`
    background-color:${props => colors[props.theme].mainBg};
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 3rem 2rem;
    padding-bottom:3rem;
    h3{
      color:${props => colors[props.theme].contrast};
    }
    img{
      max-width:600px;
    }
    `;

function ErrorPage() {
  const theme=useContext(PageThemeContext);
    return (
      <><Spacer />
        <StyledErrorPage theme={theme}>
        <Spacer />
        <h3>Oups...</h3>
        <Spacer />
        <img src={ErrorIllustration} alt="Shiny error page illustration" />
        <Spacer />
        <h3>Il semblerait qu’il y ait un problème</h3>
      </StyledErrorPage></>
    );
  }
  
  export default ErrorPage;