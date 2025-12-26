
import styled from 'styled-components'

const StyledEmptyPlaceholder = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-15deg);
    font-size: 2.5rem;
    font-weight: 900;
    font-style: italic;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    color: rgba(0,0,0,0.8);
`;

export default function withBanner(WrappedComponent, text) {
    return ({soldOut, ...props}) => {
        if(!soldOut) {
            return <WrappedComponent {...props} soldOut={soldOut} />
        }
        return (
            <div style={{position: 'relative', display: 'inline-block'}}>
                <WrappedComponent {...props} soldOut={soldOut}  />
                <StyledEmptyPlaceholder>{text}</StyledEmptyPlaceholder>
            </div>
        )
    }
}