import React from "react";
import styled from "styled-components";

function ModeSwitcher(props) {
  const { isChecked, onChange, disabled } = props;
  const id = "demoModeInput";
  return (
    <StyledSwitcher>
      <span className="label">{isChecked ? "Real Mode" : "Demo Mode"}</span>
      <input
        id={id}
        className="input"
        type="checkbox"
        onChange={() => onChange(!isChecked)}
        checked={isChecked}
        disabled={disabled}
      />
      <label htmlFor={id} className="container" />
    </StyledSwitcher>
  );
}
export default ModeSwitcher;

const StyledSwitcher = styled.div`
  font-family: Mulish;
  display: flex;
  align-items: center;
  margin-right: 24px;

  .label {
    margin-right: 10px;
    font-size: 12px;
    line-height: 20px;
    color: #252733;
    white-space: nowrap;
    font-family: "Mulish", sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  .container {
    border: 2px solid #b4e4d7;
    background-image: linear-gradient(180deg, #43bc9c 0%, #43bc9c 100%);
    background-size: 0;
    background-repeat: no-repeat;
    border-radius: 100px;
    display: block;
    position: relative;
    cursor: pointer;
    padding: 10px 18px 10px 18px;
    transition: all 0.3s ease;
    margin: 0;

    &:after {
      background: #ffffff;
      border-radius: 50%;
      content: "";
      position: absolute;
      display: block;
      border: 2px solid #b4e4d7;
      width: 16px;
      height: 16px;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }

  .input {
    opacity: 0;
    position: absolute;

    &:checked + .container {
      border: 2px solid #43bc9c;
      background-size: 100%;

      &:after {
        right: 0;
        left: unset;
        border: 2px solid transparent;
      }
    }
  }
`;
