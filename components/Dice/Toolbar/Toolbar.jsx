import React from "react";
import ModeSwitcher from "../../Dice/ModeSwitcher/ModalSwitcher";
import FairnessModal from "../Modals/Fairness/Fairness";
import RulesModal from "../../Dice/Modals/Rules/Rules";
import styled from "styled-components";
import  AudioIcon  from "../../../assets/img/audio.svg";

function Toolbar(props) {
  const {
    isRealMode,
    isRolling,
    onModeChange,
    isAudioEnabled,
    onAudioToggle,
  } = props;

  return (
    <StyledContainer>
      <ModeSwitcher
        isChecked={isRealMode}
        onChange={onModeChange}
        disabled={isRolling}
      />
      <StyledNav>
        <FairnessModal btnClass="toolbar-btn" />
        {/* <PreviousModal currencyValue={currencyValue} btnClass='toolbar-btn' /> */}
        <RulesModal btnClass="toolbar-btn" />
        <StyledBtn
          className={`toolbar-btn toolbar-btn-sound ${
            isAudioEnabled && "active"
          }`}
          type="button"
          onClick={onAudioToggle}
        >
          <AudioIcon />
        </StyledBtn>
      </StyledNav>
    </StyledContainer>
  );
}

export default Toolbar;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 586px) {
    justify-content: flex-end;
  }
`;
const StyledNav = styled.div`
  display: flex;
`;
const StyledBtn = styled.button`
  &.toolbar-btn {
    appearance: none;
    opacity: 0.6;
    margin-left: 16px;
    height: 24px;
    width: 24px;
    padding: 0;

    &:not(.btn-sound):hover {
      opacity: 1;
      transition: opacity 0.5s;
    }

    &-sound {
      opacity: 0.5;
      &.active {
        border-radius: 100%;
        opacity: 1 !important;
        path {
          fill: rgba(255, 226, 102, 0.3);
          stroke: #ffe266;
        }
      }
    }
  }
`;
