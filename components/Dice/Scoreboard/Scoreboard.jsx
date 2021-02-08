import { useState } from "react";
import styled from "styled-components";
import { TYPES } from "./types"
import {StyledH2} from "../../../styles/global.style"

const ROUND_SLICES = [100];

function Scoreboard(props) {

  const [roundCount] = useState(ROUND_SLICES[0]);
  const [activeType, setActiveType] = useState(0);

  const historyData = () => {
    const { historyData } = props;

    return historyData.slice(0, roundCount);
  };

  const data = () => {
    const dataType = TYPES[activeType];

    return dataType.slices.map(({ min, max }) => {
      const count = historyData().filter((n) => n >= min && n <= max).length;
      let minFormated = min.toString();
      while (minFormated.length < 4) {
        minFormated = `0${minFormated}`;
      }
      return {
        min: minFormated,
        max,
        count,
        percent: Math.round((count / historyData().length) * 100),
      };
    });
  };

  const setActive = activeType => {
    setActiveType(activeType);
  }

  return (
    <StyledScoreBoard>
      <StyledTopBar>
        <StyledH2 className="title">Scoreboard</StyledH2>
        <StyledP color="#43BC9C" fontSize="12px">
          Last 100 rounds
        </StyledP>
      </StyledTopBar>
      <StyledTypeSwitcher>
        {TYPES.map(({ name }, ind) => (
          <StyledButton
            className={`type-switcher-btn ${
              activeType === ind ? "active" : ""
            }`}
            type="button"
            key={name}
            onClick={() => setActive(ind)}
          >
            {name}
          </StyledButton>
        ))}
      </StyledTypeSwitcher>
      <StyledData>
        {data().map(({ min, max, count, percent }) => (
          <StyledDataContainer className="data-row" key={min}>
            <div className="data-param label">
              {min} ~ {max}
            </div>
            <div className="data-param count">{count}</div>
            <div className="data-param percent">{percent || 0}%</div>
          </StyledDataContainer>
        ))}
      </StyledData>
    </StyledScoreBoard>
  );
}

const StyledScoreBoard = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  .title {
    margin: 0;
  }
`;

const StyledTopBar = styled.div`
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledP = styled.p`
  color: ${({ color }) => (color ? color : "inherit")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
`;

const StyledButton = styled.div`
  border: 1px solid #43bc9c;
  box-sizing: border-box;
  border-radius: 6px;
  -webkit-appearance: none;
  width: 63px;
  font-size: 12px;
  color: #43bc9c;
  text-align: center;
  padding: 6px 0;
  cursor: pointer;
  &.active {
    background-color: #43bc9c;
    color: #ffffff;
  }
`;

const StyledTypeSwitcher = styled.div`
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledData = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  &-row {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
`;

const StyledDataContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: #bebec2;
  padding: 24px 32px;
  :not(:last-of-type) {
    border-bottom: 2px solid #f2f8f7;
  }
  .label {
    font-size: 14px;
  }
  .count {
    background: -webkit-linear-gradient(90deg, #fdd50b 0%, #fea24c 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 16px;
    font-weight: 800;
  }
  .percent {
    font-size: 14px;
  }
`;

export default Scoreboard;
