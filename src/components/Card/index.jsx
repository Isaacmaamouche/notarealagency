
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "../../utils/style/colors";

import { useContext } from "react";
import { Link } from "react-router-dom";
import {PageThemeContext} from '../../utils/PageThemeContext';

import DefaultPicture from '../../assets/profile.png';

const CardElement = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-between;
    cursor:pointer;
    padding:1rem;
    background-color:${props => colors[props.theme].mainBg};
    border-radius: 30px;
    transition: 200ms;
    &:hover {
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`;

const CardLabel = styled.span`
    color: ${props => colors[props.theme].primary};
    font-size: 1rem;
    font-weight: bold;
    width: 90%;
    @media (max-width: 768px){
        width: unset;
    }

`;

const CardImage = styled.img`
    margin:1rem;
    width: clamp(100px, 40%, 200px);
    border-radius: 50%;
`;

const CardTitle = styled.span`
    color: ${props => colors[props.theme].contrast};
`;


function Card({ label, title, picture, id }) {    
    const {theme} = useContext(PageThemeContext);
    return (

        <Link to={`/profils/${id}`} data-id={label+`-`+id}>
            <CardElement theme={theme}>
                <CardLabel theme={theme}>{label}</CardLabel>
                <CardImage src={picture} alt="freelance"/>
                <CardTitle theme={theme}>{title}</CardTitle>
            </CardElement>
        </Link>

    )
};

Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string,
};
 
Card.defaultProps = {
    label:'Name',
    title: 'Job title',
    picture:DefaultPicture
};

export default Card;