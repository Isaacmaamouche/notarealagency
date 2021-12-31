import styled from "styled-components";

const StyledSpacer = styled.hr`
    margin:
    ${props => props.topBottom === undefined ? `1rem 0rem` : props.topBottom + ` 0rem`};
    opacity: 0;
    `;


export default function Spacer(props){
    const topBottom = props.topBottom;
    return (
        <StyledSpacer topBottom={topBottom} />
    )
}