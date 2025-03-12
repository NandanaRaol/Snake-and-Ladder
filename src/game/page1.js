import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import gameLogo from '../game.logo.png';
const Title = styled.h1`
  color: blue;
  font-size: 2cm;
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  color: blue;
  height: 40px;
  width: 110px;
  border-radius: 10px;
  background-color: lightblue;
  margin-top: 20px;
  font-size: 20px;
`;
function Page1() {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>WELCOME TO SNAKE AND LADDERS</Title>
      <img src={gameLogo} height="400px" width="400px" alt="Game Logo" />
      <Button onClick={() => navigate("/page2")}>Enter</Button>
    </Container>
  );
}
export default Page1;

