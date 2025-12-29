
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

type ProductListProps = {
  title: string;
  total:number;
  children: React.ReactNode;
}
export default function ProductList({title, children, total}: ProductListProps) {
    
    if(total===0){
        return <div>暂无新品</div>
    }

    return (
        <StyledListContainer>
            <StyledListTitle>{title}</StyledListTitle>
            {children}
        </StyledListContainer>
    );
}