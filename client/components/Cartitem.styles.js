import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center
  font-family: 'Roboto', sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  position: center
 

  div {
    flex: 4;
  }
  span {
    font-family:Arial,sans-serif;
    font-size:10px
    display:flex;
  }
  .information,
  

  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
    shape: circle
  }
`;
