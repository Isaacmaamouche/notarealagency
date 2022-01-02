import styled from 'styled-components';
import Card from '../../components/Card';
import colors from '../../utils/style/colors';
import PageThemeContext from '../../utils/PageThemeContext';
import Spacer from '../../components/Spacer'
import { useContext } from 'react';
import LoadingAnimation from '../../utils/Loader';
import { useFetch } from '../../utils/hooks/useFetch';

    const CardsContainer = styled.div`
    margin: 0 3rem;
    h2,p{
        text-align:center;
    }
    h2{
        color:${props => colors[props.theme].contrast};
        text-align:center;
    }
    p{
        color:${props => colors[props.theme].secondary};
    }
    div.grid{
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 768px){
        div.grid{
            grid-template-columns: 1fr;
        }
        margin:0 1rem;
    }
`;

function Freelances() {
    const theme = useContext(PageThemeContext);
    const { data, isDataLoading, error } = useFetch(`/freelances`);
    const {freelancersList} = data;

    return (
        <div><Spacer/>
            {isDataLoading ? 
                (<LoadingAnimation />) 
                :(error?(
                <p>Oups.. Une erreur s'est produite.</p>
                ):(
                <>
                <CardsContainer theme={theme}>
                <h2 id="profils">Trouvez votre prestataire</h2>
                <Spacer />
                <p>Chez Shiny nous réunissons les meilleurs profils pour vous.</p>
                <Spacer />
                <div className='grid'>
                    {freelancersList && freelancersList.map((profile) => (
                        <Card
                            key={`key-${profile.id}`}
                            id={profile.id}
                            label={profile.job}
                            picture={profile.picture}
                            title={profile.name}
                        />
                    ))}               
                </div>
            </CardsContainer>
            </>
                ))}
                
        </div>
    )
};

export default Freelances;
