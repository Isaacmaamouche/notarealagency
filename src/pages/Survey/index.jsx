import React, { useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import {PageThemeContext} from '../../utils/PageThemeContext';
import SurveyContext from '../../utils/SurveyContext';
import Spacer from '../../components/Spacer';
import LoadingAnimation from '../../utils/Loader';
import { useFetch } from '../../utils/hooks/useFetch';

const StyledSurvey = styled.div`
    display:flex;
    padding: 1rem;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color:${props => colors[props.theme].Mainbg};
    color:${props => colors[props.theme].contrast};
    text-align:center;
    h2{
        margin-bottom:2rem;
        position:relative;
        &:after{
            content:'';
            width:100%;
            height:1px;
            background:${colors.light.primary};
            position:absolute;
            bottom:0;
            left:0;
        }
    }
    `;
    
// const StyledSurveyLink = styled.div`
//     text-align:center;
//     margin-top:3rem;
//     display:flex;
//     flex-direction: row;
//     justify-content: space-evenly;
//     width: 100%;
    
//     a:visited {
//         color: inherit;
//     }
//     `;

const StyledSurveyAnswer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    button{
        background-color:${props => colors[props.theme].Mainbg};
        border:none;
        border-radius:30px;
        padding: 35px 70px;
        line-height:1px;
        margin:3rem 1rem;
        transition:200ms all ease;
        &:hover{
            box-shadow: 0 0 0 2px ${colors.light.primary};
            @media (hover:none){
                box-shadow: none;
            }
        }
        &:focus, &:focus-visible {
            outline: transparent;
        }
    }
    @media (max-width:768px){
        grid-template-columns: 1fr;
        button{
            margin:2rem 1rem 0;
        }
    }
    `;

 

export default function Survey() {
    const {theme} = useContext(PageThemeContext);
    const {isDataLoading, data, error} = useFetch('/survey');
    const {surveyData} = data;
    let {questionNumber} = useParams();

    // eslint-disable-next-line
    if(questionNumber == undefined || questionNumber <= 0){
        questionNumber = 1;
    }
    function Question(x, currentQuestionNumber){
        let value = currentQuestionNumber + x ;
        return value > 0 ? value : 1;
    }
    let questionNumberInt = parseInt(questionNumber);

    const {answers, setAnswers} = useContext(SurveyContext);
    function addAnswers(answer, answerNumber){
        let updatedAnswers = answers;
        updatedAnswers[answerNumber-1] = answer;
        setAnswers(updatedAnswers);
    }

    return (
        <StyledSurvey theme={theme}>
            <Spacer topBottom='2rem'/>
            {isDataLoading ? 
                (<LoadingAnimation />) 
                :
                (<>
                {error && <p>Oups.. Une erreur s'est produite.</p>}
                {!error && surveyData &&<>
                <h2>Question {questionNumber}</h2>
                <p>{surveyData[questionNumberInt]}</p>
                </>}
            
                {!error && (<StyledSurveyAnswer theme={theme}>
                    {surveyData && surveyData[Question(1, questionNumberInt)] ? (
                        <>
                        <Link to={"/survey/" + Question(1, questionNumberInt)} onClick={()=>addAnswers(1, questionNumberInt)}><button>Oui</button></Link>
                        <Link to={"/survey/" + Question(1, questionNumberInt)} onClick={()=>addAnswers(0, questionNumberInt)}><button> Non</button></Link>
                        </>
                    ) : (
                        <>
                        <Link to="/results" onClick={()=>addAnswers(1, questionNumberInt)}><button>Oui</button></Link>
                        <Link to="/results" onClick={()=>addAnswers(0, questionNumberInt)}><button> Non</button></Link>
                        </>
                    )}
                </StyledSurveyAnswer>)}</>
            )}

            {/* {!isDataLoading && (
                <>
                <StyledSurveyLink>
                    {questionNumberInt !== 1 && (
                        <Link to={"/survey/" + Question(-1, questionNumberInt)}>
                            Précédente
                        </Link>
                    )}
                    {surveyData && surveyData[Question(1, questionNumberInt)] ? (
                        <Link to={"/survey/" + Question(1, questionNumberInt)}>
                            Suivante
                        </Link>
                    ) : (
                        null
                    )}
                    
                </StyledSurveyLink>
                </>
            )} */}
        </StyledSurvey>
    )
};
