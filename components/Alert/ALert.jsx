import React from "react";
import styled,{ css } from "styled-components";

const Alert = ({ message, alert }) => {

  return (
    <div>
      <StyledAlert isOpen={alert}>
        <p>{message}</p>
      </StyledAlert>
    </div>
  );
};

const StyledAlert = styled.div`
  display: flex;
  background-color: #43bc9c;
  border-radius: 5px;
  width: 300px;
  position: fixed;
  top: 6em;
  right: 3px;
  justify-content: center;
  z-index: 1;
  ${({ isOpen }) =>
    isOpen
      ? css`
          right: 3px;
          opacity: 1;
        `
      : css`
          right: -200px;
          opacity: 0;
        `};
  transition: all 0.4s ease;
  p {
    line-height: 1.43;
    letter-spacing: 0.01071em;
    color: #fff;
    font-weight: 500;
    font-size: 0.875rem;
    padding: 10px;
  }
  @media only screen and (max-width: 970px) {
    position: fixed;
  }
`;

export default Alert;
