import styled from "styled-components";
import colors from "../../utils/style/colors";
import { useContext } from "react";
import PageThemeContext from "../../utils/PageThemeContext";

const StyledLink = styled.a`
    padding:5px 35px;
    color:white;
    text-decoration:none;
    font-size:18px;
    border-radius: 30px; 
    background-color: ${colors.light.primary};
    white-space: nowrap;
    `;


export default function LinkButton(props){
    const theme = useContext(PageThemeContext);
    const value = props.value;
    const link = props.link;
    const target = props.target || null;
    const onClick = props.onClick || null;
    return (
        <StyledLink href={link} target={target} onClick={onClick} theme={theme}>{value}</StyledLink>
    )
}