import {DICE} from "../../../utils/defines";
import {useEffect, useState} from "react";
import {usePrevious} from "../../../hooks/usePrevious";
import styled from "styled-components";


const ResultReveal = ({result, disabled}) => {

    const [sideClass, setSideClass] = useState(null);
    const prevResult =  usePrevious(result)

    useEffect(() => {
        if(!disabled && !result && !prevResult) {
            setSideClass(() => null);
        }else if(result) {
            setSideClass(() => result > DICE._MAX_NUMBER / 2 ? 'left' : 'right');
        }
    },[result, disabled])
    let right;
    let left;
    if (result) {
        const position = (result / DICE._MAX_NUMBER) * 100;

        if (position < 50) {
            right = `calc(${100 - position}% - 43px)`;
            left = undefined;
        } else {
            right = undefined;
            left = `calc(${position}% - 43px)`;
        }
    }

    return (
        <StyledResult
            className={`${sideClass} ${!!result && 'show'}`}
            style={{ left, right }}
        >
            {result}
        </StyledResult>
    );
};

export default ResultReveal;

const StyledResult = styled.div`
  top: 60px;
  opacity: 0;
  left: 0;
  position: absolute;
  font-family: 'Mulish',sans-serif;
  font-weight: 800;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.4px;
  padding: 10px 0;
  text-align: center;
  color: #43BC9C;
  font-style: normal;
  width: 86px;
  background: #FFFFFF;
  transform: scale(0);
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(191, 216, 210, 0.7);
  transition: transform .2s, right .0s ease .2s, left .0s ease .2s, opacity .3s;
  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #FFFFFF;
  }
  &.left {
    right: unset;
    left: 0;
  }

  &.right {
    left: unset;
    right: 0;
  }

  &.show {
    opacity: 1;
    transform: scale(1);
    transition: transform .5s, left .4s, right .4s, opacity .3s;
  }
`