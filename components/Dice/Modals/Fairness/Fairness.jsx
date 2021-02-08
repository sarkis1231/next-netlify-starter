import React, { Fragment, useState } from "react";
import TabsSwitcher from "../TabsSwitcher";
import Modal from "../BaseModal";
// import Verify from './Verify';
import styled from "styled-components";
import  RectangleIcon  from "../../../../assets/img/rectangle.svg";

const TABS = {
  fairness: () => (
    <div>
      <h2>HashChain</h2>
      <p>
        Ape Dice uses&nbsp;
        <StyledLink
          href="https://github.com/gluk256/misc/blob/master/rng4ethereum/signidice.md"
          target="_blank"
          rel="noreferrer"
          className="mx-1"
        >
          signdice algorithm&nbsp;
        </StyledLink>
        to provide a secure and provably fair gambling experince.
      </p>
      <h2>Randomness</h2>
      <p>
        On each bet a random seed is generated on the user side, submitted in
        the transaction and saved on the smart contract.
      </p>
      <p>
        Croupier generates a hash by siging user's seed with his private key and
        passes the signature to the smart contract.
      </p>
      <h2>Game Result</h2>
      <p>
        Smart contract verifies the signature and makes sure the player seed was
        used.
      </p>
      <blockquote>ecrecover(_seed, _v, _r, _s) == croupier</blockquote>
      <p>
        Smart contract generates a random result based on the croupier's random
        hash.
      </p>
      <blockquote>result = uint256(_s).mod(10000).add(1);</blockquote>
      <p>
        Since the final result depends on the player's seed and croupier's
        private key, it can't be predicted or manipulated by any side.
      </p>
    </div>
  ),
  // verify: () => <Verify />,
};

function Fairness(props) {

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(Object.keys(TABS)[0]);

  const tabContent = () => {
    return TABS[activeTab]();
  };

  const toggle = () => {
    setOpen(!open);
    setActiveTab(Object.keys(TABS)[0]);
  };

  const setActive = (activeTab) => {
    setActiveTab(activeTab);
  };

  const { btnClass } = props;

  return (
    <Fragment>
      <StyledBtn className={btnClass} type="button" onClick={toggle}>
        <RectangleIcon />
      </StyledBtn>
      <Modal open={open} onClick={() => setOpen(prev => !prev)}>
        <TabsSwitcher
          gridTemplatesColumn="1fr"
          activeTab={activeTab}
          onTabChange={setActive}
          tabs={Object.keys(TABS)}
        />
        {tabContent()}
      </Modal>
    </Fragment>
  );
}

export default Fairness;

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
      transition: opacity 0.5s ease;
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

const StyledLink = styled.a`
  font-weight: 700;
`
