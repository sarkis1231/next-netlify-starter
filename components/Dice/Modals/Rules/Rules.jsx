import React, { Fragment, useState } from "react";
import PrimaryButton from "../../../Dice/PrimaryButton/PrimaryButton";
import Modal from "../BaseModal";
import TabsSwitcher from "../TabsSwitcher";
import Guide from "./Guide";
import styled from "styled-components";
import ChatIcon from "../../../../assets/img/chat.svg";

const TABS = {
  rules(props, state, close) {
    return <Guide {...props} {...state} onClose={close} />;
  },
  limits: ({ minBet, maxPayout, decimals }, state, close) => {
    return (
      <Fragment>
        <StyledLimits>
          <div className="row">
            <span className="param">Min Bet: </span>
            <span className="value">10 TRX/APE</span>
          </div>
          <div className="row">
            <span className="param">Max Payout:</span>
            <span className="value">10,000 TRX/APE</span>
          </div>
        </StyledLimits>
        <PrimaryButton
          btnMargin="auto"
          onClick={() => close()}
          text="Play Now"
          block
        />
      </Fragment>
    );
  },
};

export default function FairnessModal(props) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Object.keys(TABS)[0]);
  const toggle = () => {
    setOpen(!open);
    setActiveTab(Object.keys(TABS)[0]);
  };

  const tabContent = () => {
    return TABS[activeTab]({ ...props }, { open, activeTab }, setOpen);
  };

  const setActiveTabFunc = (activetab) => {
    setActiveTab(activetab);
  };

  const { btnClass } = props;

  return (
    <Fragment>
      <StyledBtn className={btnClass} type="button" onClick={() => toggle()}>
        <ChatIcon />
      </StyledBtn>
      <Modal open={open} onClick={() => setOpen((prev) => !prev)}>
        <TabsSwitcher
          activeTab={activeTab}
          onTabChange={setActiveTabFunc}
          tabs={Object.keys(TABS)}
        />
        {tabContent()}
      </Modal>
    </Fragment>
  );
}

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
        background: #593781;
        border-radius: 100%;
        opacity: 1 !important;
      }
    }
  }
`;
const StyledLimits = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px 0;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #242424;
  text-transform: uppercase;
  height: 100%;
  width: 100%;
  font-style: normal;
  font-family: "Mulish", sans-serif;

  .row {
    height: 24px;
    display: flex;
    margin-bottom: 6px;
    width: 100%;
  }

  .param {
    display: block;
    padding-right: 24px;
    text-align: right;
    width: 50%;
  }

  .value {
    display: block;
    width: 50%;
  }
`;
