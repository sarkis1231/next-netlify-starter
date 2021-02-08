import React from "react";
import styled, { keyframes } from "styled-components";

export default function PrimaryButton({
  disabled,
  onClick,
  children,
  className,
  text,
  block,
  btnColor,
  btnBackgroundColor,
  btnBorder,
  btnPadding,
  btnMargin,
  mobilePadding,
}) {
  return (
    <StyledBtn
      btnMargin={btnMargin}
      btnPadding={btnPadding}
      btnBorder={btnBorder}
      btnColor={btnColor}
      btnBackgroundColor={btnBackgroundColor}
      className={`btn ${className} ${block && "block"}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      mobilePadding={mobilePadding}
    >
      {text || children}
    </StyledBtn>
  );
}

const rotateSVG = keyframes`
  0%   {transform: rotate(0);}
  100%  {transform: rotate(360deg);}
`;

const StyledBtn = styled.button`
  background: ${({ btnBackgroundColor }) =>
    btnBackgroundColor
      ? btnBackgroundColor
      : "linear-gradient(90deg, #FDD50B 0%, #FEA24C 100%)"};
  border-radius: 12px;
  line-height: 21px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: ${({ btnColor }) => (btnColor ? btnColor : "#ffffff")};
  /* font-family: "Mulish", sans-serif; */
  font-style: normal;
  padding: ${({ btnPadding }) => (btnPadding ? btnPadding : "15px 0 15px")};
  border: ${({ btnBorder }) => (btnBorder ? btnBorder : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  @media (max-width: 662px) {
    margin: ${({ btnMargin }) => (btnMargin ? btnMargin : "0 0 21px 0")};
    padding: ${({ mobilePadding }) => (mobilePadding ? mobilePadding : "")};
  }
  &.block {
    width: 100%;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &-note {
    color: #d4bdef;
    display: block;
    font-size: 12px;
    line-height: 1.33;
    margin: 8px auto;

    @media (min-width: 768px) {
      margin-bottom: 16px;
    }
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }
  @keyframes rotateSVG {
  }
  &.active {
    svg {
      animation-name: ${rotateSVG};
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }
  }
  &:hover {
    color: ${({ btnColor }) => (btnColor ? btnColor : "#ffffff")};
  }
  &:focus {
    box-shadow: none;
  }
`;
