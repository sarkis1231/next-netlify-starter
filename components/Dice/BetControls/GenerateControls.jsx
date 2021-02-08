import React from "react"
import styled from "styled-components";
import { ReactComponent as UpIcon } from "../../../assets/img/up.svg";
import { ReactComponent as DownIcon } from "../../../assets/img/down.svg";
import { StyledNumberControlsBtn } from "../../../styles/global.style"
import minmax from "../../../utils/minmax"
import numberFormat from "../../../utils/numberFormat";

function GenerateControls({value, step, handler, min, max}) {
  const d = step.toString()?.split(".")[1]?.length || 0;
  return (
    <StyledControlInputAddonAndControlNumber>
      <StyledNumberControlsBtn
        type="button"
        aria-label="Up"
        onClick={() => handler(minmax(numberFormat(value + step, d), min, max))}
      >
        <UpIcon />
      </StyledNumberControlsBtn>
      <StyledNumberControlsBtn
        type="button"
        aria-label="Down"
        onClick={() => handler(minmax(numberFormat(value - step, d), min, max))}
      >
        <DownIcon />
      </StyledNumberControlsBtn>
    </StyledControlInputAddonAndControlNumber>
  );
}

export default GenerateControls

  const StyledControlInputAddonAndControlNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 6px;
  right: 11px;
  border-radius: 0 4px 4px 0;
  overflow: hidden;

  &-btn {
    appearance: none;
    background: rgba(#3c1b63, 0.4);
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;

    &:hover {
      background: rgba(#3c1b63, 0.6);
      transition: all 0.1s;
    }
  }
`;
