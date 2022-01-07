import styled from "styled-components";
import colors from "../../utils/style/colors";
import {PageThemeContext} from "../../utils/PageThemeContext";
import SurveyContext from "../../utils/SurveyContext";
import { useContext } from "react";
import Spacer from "../../components/Spacer";
import LinkButton from "../../components/LinkButton";
import LoadingAnimation from '../../utils/Loader';
import ResultIllustration from '../../assets/results-illustration.svg';
import { useFetch } from "../../utils/hooks/useFetch";

const StyledResultPage = styled.div`
    background-color:${props => colors[props.theme].mainBg};
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 3rem 2rem;
    padding-bottom:3rem;
    .jobTitle, h2 span{
      color:${props => colors[props.theme].primary};
      margin-top:0.5rem;
      text-transform: capitalize;
  }
  p{
      font-size:1rem;
      color:${props => colors[props.theme].secondary};
      text-align: justify;
  }
  h2{
      color:${props => colors[props.theme].contrast};
      text-align:center;
      
  }
  h2,p {
      width:clamp(600px, 50%, 800px);
      @media (max-width:768px){
          width:unset;
          padding:0 1rem;
          align-self: flex-start;
      }
  }
  h3{
    color:${props => colors[props.theme].contrast};
    text-align:center;
  }
  img{
    max-width:600px;
  }
  `;

  export function formatJobList(title, index) {
    return ((index===0?'':', ') + title);
}

function ResultPage() {
  const {theme} = useContext(PageThemeContext);
  const {answers} = useContext(SurveyContext);
  let queryParams = '';
  function FormatAnswers(answers){
    answers.forEach((answer, index) => {
      if(index === 0){queryParams += ('a' + (index+1) + '=' + answer)}
      else{
        queryParams += ('&a' + (index+1) + '=' + answer)
      }
    })
  };

  if(answers)FormatAnswers(answers);
  const { data, isDataLoading, error } = useFetch(`/results?${queryParams}`);
  const {resultsData} = data;

  let noNeeds = false;
  if(answers){
    noNeeds=true;
    for (let i = 0; i < answers.length; i++) {
      if(answers[i]===1){noNeeds = false;}
      }
  } 
  // console.log('answers',answers);
  // console.log('noNeeds',noNeeds);
  // console.log('queryParams', queryParams);
  // console.log('results',resultsData);

    return (
      <><Spacer />
        <StyledResultPage theme={theme}>
        <Spacer />
        {!noNeeds && isDataLoading ? 
                (<LoadingAnimation />) 
                :
                (<>
                {error && <p>Oups.. Une erreur s'est produite.</p>}
                {!error && !noNeeds && resultsData &&
                <>
                <h2>Les compétences dont vous avez besoin : 
                  {/* {resultsData.map((obj, index)=>{return <span key={'jobSpan'+index}>{(index===0?'':', ') + obj.title}</span> */}
                  {resultsData.map((obj, index)=>{return <span key={'jobSpan'+index}>{formatJobList(obj.title, index)}</span>})}
                </h2>
                <Spacer/>
                <LinkButton value="Découvrez nos profils" link="/freelances" />
                <Spacer/>
                {resultsData.map((obj, index)=>{
                  return(<>
                  <p className='jobTitle' key={'job'+index}>{obj.title}</p>
                  <p key={'desc'+index}>{obj.description}</p>
                  </>);
                })}
                </>}
        </>)}

        {noNeeds &&(<><Spacer />
        <h3>Dommage...</h3>
        <Spacer />
        <img src={ResultIllustration} alt="Shiny error page illustration" />
        <Spacer />
        <h3>Il semblerait que vous n’ayez besoin d’aucune compétence</h3>
        <Spacer />
        <LinkButton value="Refaire le test" link="/survey" /></>)}


      </StyledResultPage>
      
      </>
    );
  }
  
  export default ResultPage;