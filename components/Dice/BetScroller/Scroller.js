import { DICE } from "../../../utils/defines";
import React from "react";
import minmax from "../../../utils/minmax";
import styled from "styled-components";
import scrollerCircle from "../../../assets/img/scrollerCircle.png";

const Scroller = ({
  number,
  disabled,
  onNumberChange,
  minNumber,
  maxNumber,
  audioPlay,
  scrollerType,
}) => {
  const handleNumberChange = (e) => {
    const newValue = Number(e.target.value);
    audioPlay("audioClick");
    return onNumberChange(minmax(newValue, minNumber, maxNumber));
  };
  let backgroundSize = `${number / 100}% 24px`;
  if (scrollerType === "over") {
    backgroundSize = `${100 - number / 100}% 24px`;
  }
  return (
    <>
      <StyledScroller
        className={`${scrollerType} scroller`}
        backgroundSize={backgroundSize}
        type="range"
        min={DICE._MIN_NUMBER}
        max={DICE._MAX_NUMBER}
        onChange={handleNumberChange}
        value={number}
        disabled={disabled}
      />
    </>
  );
};

const StyledScroller = styled.input`
  background-size: 200px 24px;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: 0 0;
  border-radius: 40px;
  -webkit-appearance: none;
  appearance: none;
  margin: 8px 0;
  width: 100%;
  height: 12px;
  transition: background-position 0.2s;
  background-size: ${({ backgroundSize }) => backgroundSize};

  &.under {
    background-image: linear-gradient(90deg, #fdd50b 0%, #fea24c 100%);
    background-position: 0;
  }

  &.over {
    background-image: linear-gradient(90deg, #fdd50b 0%, #fea24c 100%);
    background-position: 100%;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track,
  &::-moz-range-track {
    width: 100%;
    height: 24px;
    cursor: pointer;
    animate: 0.2s ease;
    border-radius: 6px;
    border: 0 solid #000101;
  }

  &::-ms-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s ease;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;
  }

  &::-moz-range-thumb {
    border: 8px solid #fff6d1;
    background: url(${scrollerCircle}) no-repeat center, #FFF6D1;
    border-radius: 40px;
    cursor: pointer;
    -webkit-appearance: none;
    margin: -8px 0;
    height: 17px;
    width: 17px;
    opacity: 0.8;
    position: relative;
  }

  &::-webkit-slider-thumb {
    border: 8px solid #fff6d1;
    background: url(${scrollerCircle}) no-repeat center, #FFF6D1;
    border-radius: 40px;
    cursor: pointer;
    -webkit-appearance: none;
    margin: -8px 0;
    height: 35px;
    width: 35px;
    opacity: 0.8;
    position: relative;
  }

  &::-ms-fill-lower,
  &::-ms-fill-upper {
    background: #000;
    border: 0 solid #000101;
    border-radius: 50px;
    height: 10px;
    width: 10px;
  }

  &::-ms-thumb {
    border: 0 solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: #ece3f7;
    cursor: pointer;
  }

  &:focus::-ms-fill-lower,
  &:focus::-ms-fill-upper,
  &:focus::-webkit-slider-runnable-track {
    background: #3c1b63;
  }
`;

export default Scroller;
