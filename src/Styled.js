import styled, {css, keyframes} from "styled-components";

export const Item = styled.div.attrs(props => ({
  size: props.size || 1
}))`
  width: calc(100% / 2);
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-size: ${props => `${props.size}rem`};
`;

export const Flex = styled.div`
  display: flex;

  ${props => props.column && css`
    flex-direction: column;
  `};
  width: 50%;
  margin: 10px auto;
  padding-bottom: 15px;

  ${props => props.border && css`
    margin: 0 auto;
    box-shadow: inset 1px 1px 0 0.25px rgb(43, 43, 43);
    padding-bottom: 0;
  `};  
  
  ${props => props.border && props.withItem && css`
    margin: 0 auto;
    padding: 10px 0;
    box-shadow: inset -1px -1px 0 0.25px rgb(43, 43, 43);
  `};

  > .title {
    align-self: center;
    margin-bottom: 15px;
  }
  
  > button,
  .position {
    margin-left: auto;
    
    + button {
      margin-left: 25px;
    }
  }

  & & {
    width: 100%;
  }
  
  & ${Item} {
    margin: 0 auto;
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;