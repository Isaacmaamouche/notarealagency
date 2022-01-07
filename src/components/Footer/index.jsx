
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useContext } from 'react';
import {PageThemeContext} from '../../utils/PageThemeContext';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
`
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

export default function Footer() {
    const {theme, switchTheme} = useContext(PageThemeContext);

  return (
    <FooterContainer>
        <Router>
            <StyledLink to="#" className="themeSwitcher" theme={theme} onClick={switchTheme}>
                {theme === 'light' ? '🌙' : '🌞'}
            </StyledLink>
        </Router>
    </FooterContainer>
  )
}
