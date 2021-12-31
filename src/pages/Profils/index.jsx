import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import PageThemeContext from '../../utils/PageThemeContext';
import Spacer from '../../components/Spacer';
import freelanceProfiles from '../../utils/freelances';
import LinkButton from '../../components/LinkButton';
import { useFetch } from '../../utils/hooks/useFetch';
import LoadingAnimation from '../../utils/Loader';

const StyledProfilPage = styled.div`
    background-color:${props => colors[props.theme].mainBg};
    color:${props => colors[props.theme].contrast};
    font-weight:bold;
    margin: 0 3rem 2rem;
    padding-bottom:3rem;
    .backbutton{
        text-align:center;
    }
    .flex{
        padding-top: 2rem;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        & > div{
            padding:1rem;
            position:relative;
            flex: 1 0;
        }
    }    
    img{
        display:block;
        margin-left:auto;
        width: clamp(100px, 40%, 200px);
        border-radius: 50%;
    }
    p{
        margin-bottom:0.4rem;
    }
    .name{
        padding:0;
        font-size:1rem;
        position:relative;
        span.location{
            color:${props => colors[props.theme].secondary};
            font-size:0.5rem;
            padding-left:2rem;
            margin-top: 0.4rem;
        }
    }
    .fare{
        font-size:0.8rem;
    }

    .jobTitle{
        font-size:0.8rem;
        margin-bottom: 0.2rem;
    }

    .skills span{
        font-size:0.5rem;
        padding:2px 4px;
        border-radius:5px;
        border:1px solid ${props => colors[props.theme].contrast};
        margin: 0 5px 0px 0px;
    }
    .status{
        font-size:0.5rem;
        padding-left:0.8rem;
        position:relative;
        &::before{
            content:'';
            position:absolute;
            left:0;
            top:50%;
            transform: translateY(-50%);
            border-radius:50%;
            width:0.5rem;
            height:0.5rem;
        }
        &.available::before{
            background-color:#57B894;
        }
        &.unavailable::before{
            background-color:red;
        }
    }
    @media (max-width:768px){
        margin: 0 1rem 2rem;

        .flex {flex-direction: column;}
        img{margin:auto;}
        span.location{
            display:block;
            padding-left:0 !important;
        }
        *{
            font-size:1rem !important;
        }
    }

    `;

export default function Profils(){
    const {id} = useParams();
    const theme = useContext(PageThemeContext);
   
    const { data, isDataLoading, error } = useFetch(`http://localhost:8000/freelance?id=${id}`);
    const {freelanceData} = data;

    return(
        <><Spacer />
         {isDataLoading ? 
                (<LoadingAnimation />) 
                :(error?(<p>Oups.. Une erreur s'est produite.</p>)
                :(freelanceData&&(<>
                    <StyledProfilPage theme={theme}>
            <div className="flex">
                <div>
                    <p><img src={freelanceData.picture} alt="freelance profil"/></p>
                </div>
                <div>
                    <div className='name'>
                        <p>
                            <span>{freelanceData.name}</span>
                            <span className='location'>{freelanceData.location}</span>
                        </p>
                    </div>
                
                    <p className='jobTitle'>{freelanceData.job}</p>
                    <p className='skills'>
                        {freelanceData.skills.map((skill, index) => {
                            return <span key={`${skill}-${index}`}>{skill}</span>;
                        })}
                    </p>
                    {freelanceData.available === true ? (
                        <p className='status available'> Disponible maintenant</p>
                    ) : (
                        <p className='status unavailable'> Indisponible</p>
                    )}
                    <p className='fare'>{freelanceData.tjm}€/jour</p>
                </div>
            </div>
            <div className="backbutton">
                <LinkButton className="backbutton" value="Voir un autre profil" link="/freelances#profils" />
            </div>
        </StyledProfilPage>
        </>)
               ))}
        </>
    )

}