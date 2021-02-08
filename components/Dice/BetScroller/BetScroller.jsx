import React, { useEffect } from "react";
import { DICE } from "../../../utils/defines";
import styled from "styled-components";
import GenerateInput from "@/components/Dice/BetScroller/GenerateInput";
import Scroller from "@/components/Dice/BetScroller/Scroller";
import ResultReveal from "@/components/Dice/BetScroller/ResultReveal";

function BetScroller({
  number,
  minNumber,
  maxNumber,
  type,
  result,
  disabled,
  onNumberChange,
  onTypeChange,
  audioPlay,
}) {
  let sideClass = null;
  useEffect(() => {
    if (!disabled && !result) {
      sideClass = null;
    } else if (result) {
      sideClass = result > DICE._MAX_NUMBER / 2 ? "left" : "right";
    }
    return true;
  }, [result, disabled]);

  let backgroundSize = `${number / 100}% 24px`;

  if(type === 'over'){
    backgroundSize = `${100 - number / 100}% 24px`;
  }

  return (
    <StyledContainer>
      <ResultReveal result={result} disabled={disabled} />
      <StyledTypePicker>
        <GenerateInput
          value="under"
          label="Roll Under"
          type={type}
          disabled={disabled}
          onTypeChange={(e)=>onTypeChange(e)}
        />
        <div className="title">
          PREDICTION
          <div className="number">
            <div>{number}</div>
          </div>
        </div>
        <GenerateInput
          value="over"
          label="Roll Over"
          type={type}
          disabled={disabled}
          onTypeChange={(e)=>onTypeChange(e)}
        />
      </StyledTypePicker>
      <Scroller
        backgroundSize={backgroundSize}
        scrollerType={type}
        type="range"
        value={number}
        min={DICE._MIN_NUMBER}
        max={DICE._MAX_NUMBER}
        number={number}
        disabled={disabled}
        minNumber={minNumber}
        maxNumber={maxNumber}
        onNumberChange={onNumberChange}
        audioPlay={audioPlay}
      />
    </StyledContainer>
  );
}

export default BetScroller;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledTypePicker = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .label {
    border-radius: 6px;
    cursor: pointer;
    display: block;
    text-align: center;
    font-size: 12px;
    line-height: 38px;
    height: 38px;
    width: 101px;
    color: #43bc9c;
    border: 1px solid #43bc9c;
    font-family: "Mulish", sans-serif;
    font-weight: bold;
  }
  .radio {
    opacity: 0;
    position: absolute;
    z-index: -1;

    &:checked + .label {
      opacity: 1;
      cursor: default;
      transition: all 0.1s;
      border: none;
      color: #ffffff;

      &.under {
        background: linear-gradient(90deg, #fdd50b 0%, #fea24c 100%);
        :hover {
          background: linear-gradient(90deg, #fea24c 0%, #fdd50b 100%);
          cursor: pointer;
        }
      }

      &.over {
        background: linear-gradient(90deg, #fdd50b 0%, #fea24c 100%);
        :hover {
          background: linear-gradient(90deg, #fea24c 0%, #fdd50b 100%);
          cursor: pointer;
        }
      }
    }
  }

  .title {
    font-size: 14px;
    font-weight: 700;
    font-family: "Mulish", sans-serif;
    color: #8b8e8d;
    font-style: normal;
    text-align: center;

    .number {
      border: 8px solid rgba(101, 199, 174, 0.2);
      display: block;
      border-radius: 40px;
      margin-top: 20px;
      div {
        width: 130px;
        height: 39px;
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;
        background: #43bc9c;
        border-radius: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 380px) {
          width: 110px;
        }
      }
    }
  }
`;

