
import styled from "styled-components";

const StyledListContainer = styled.div`
  display: grid;
  justify-items: center;
  row-gap: 3rem;
`;

const StyledListTitle = styled.h1`
  font-weight: 800;
  background-image: url('src/assets/lines.png');
  background-position: center;
`;
export function ProductList({title, children, total}) {
    
    if(total.length===0){
        return <div>暂无新品</div>
    }

    return (
        <StyledListContainer>
            <StyledListTitle>{title}</StyledListTitle>
            {children}
        </StyledListContainer>
    );
}