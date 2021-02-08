import React from "react";
import minmax from "../../../utils/minmax";
import numberFormat from "../../../utils/numberFormat";
import styled from "styled-components";

export default function GenerateAdvancedControls({
  value,
  step,
  handler,
  min,
  max,
  disabled,
}) {
  const d = step.toString().split(".")[1]?.length || 0;

  return (
    <>
      <StyledControlInputAddonAdvance>
        <StyledBtnBetAmount
          type="button"
          aria-label="Max"
          onClick={() => handler(max)}
          disabled={disabled}
        >
          Max
        </StyledBtnBetAmount>
      </StyledControlInputAddonAdvance>
      <StyledControlInputAddonAdvance>
        <StyledBtnBetAmount
          type="button"
          aria-label="Double"
          onClick={() => handler(minmax(numberFormat(value * 2, d), min, max))}
          disabled={disabled}
        >
          2x
        </StyledBtnBetAmount>
      </StyledControlInputAddonAdvance>
      <StyledControlInputAddonAdvance>
        <StyledBtnBetAmount
          type="button"
          aria-label="Divide"
          onClick={() => handler(minmax(numberFormat(value / 2, d), min, max))}
          disabled={disabled}
        >
          &#189;
        </StyledBtnBetAmount>
      </StyledControlInputAddonAdvance>
      <StyledControlInputAddonAdvance>
        <StyledBtnBetAmount
          type="button"
          aria-label="Min"
          onClick={() => handler(min)}
          disabled={disabled}
        >
          Min
        </StyledBtnBetAmount>
      </StyledControlInputAddonAdvance>
    </>
  );
}

const StyledBtnBetAmount = styled.button`
  appearance: none;
  width: 36px;
  height: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  font-style: normal;
  font-family: "Mulish", sans-serif;
  color: #bebec2;
  border: none;
  stroke: #bebec2;
  background-color: #ffffff;
  padding: 8px 0 8px 0;
  border-radius: 5px;

  &:hover {
    background: rgba(#3c1b63, 0.6);
    transition: background 0.1s;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const StyledControlInputAddonAdvance = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  overflow: hidden;
  right: 10px;
  bottom: 17px;
  @media (max-width: 585px) {
    bottom: 6px;
  }
  &:nth-of-type(2) {
    right: 50px;
  }
  &:nth-of-type(3) {
    right: 90px;
  }
  &:nth-of-type(4) {
    right: 130px;
  }
`;
