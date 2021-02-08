import React, { useRef, useState, useContext } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import RollDiceIcon from "../../../assets/img/rollDice.svg";
import { ReactComponent as AutoRollIcon } from "../../../assets/img/AutoRollIcon.svg";
import GenerateGroup from "@/components/Dice/BetControls/GenerateGroup";
import styled from "styled-components";
import { StyledControls } from "../../../styles/global.style";
import GenerateAdvancedControls from "@/components/Dice/BetControls/GenerateAdvancedControls";
import { chance, multiplier } from "../../../utils";
import { TronWebContext } from "context/tronWebContext";
import {  apeApprove } from "../../../utils/tronWeb/ape";
import Alert from "@/components/Alert/ALert";
import numberFormat from "utils/numberFormat";

let intervalID;
let timerId = 0;

function BetControls({
  amount,
  number,
  type,
  onRoll,
  minBet,
  maxPayout,
  onAmountChange,
  decimals,
  isRolling,
  isRealMode,
  currencyValue,
  betStep,
}) {
  const data = useContext(TronWebContext);

  const [isLoad, setIsLoad] = useState(false);
  const [active, setActive] = useState(false);
  const [allowanceState, setAllowanceState] = useState(null);
  const [approve, setApproveState] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, message: "" });



  const handleApprove = async () => {
    try {
      setIsLoad(false);
      setApproveState(true);
      const allowance = await apeApprove();
      setIsLoad(false);
      setApproveState(false);
      allowanceState;
    } catch (e) {
      if (e) {
        setApproveState(false);
      }
    }
  };

  const round = 10 ** decimals;
  const maxBet =
    Math.floor(
      (maxPayout / multiplier(number, type, () => chance(number, type))) * round
    ) / round;
  const betAmount = useRef(null);
  const handleAmountChange = (v) => {
    onAmountChange(v);
  };
  function payout(isRealMode, amount) {
    const res = isRealMode
      ? amount * multiplier(number, type, () => chance(number, type))
      : 0;
    return numberFormat(res, 6);
  }
  const handleRollClick = () => {
    onRoll();
  };

  const handleAutoRollClick = () => {
    setActive(!active);
    if (!active) {
      autoRoll();
    } else {
      clearInterval(intervalID);
    }
  };

  function autoRoll() {
    onRoll();
    intervalID = setInterval(() => {
      onRoll();
    }, 2500);
  }

  const handleTronWebConnection = () => {
    if (!window.tronWeb) {
      setAlert({ isOpen: true, message: "Please Install TronLink" });
      if (alert) {
        timerId = setTimeout(() => {
          setAlert({ isOpen: false });
        }, 3000);
      }
    } else {
      setAlert({ isOpen: true, message: "Please Unlock TronLink" });
      if (alert) {
        timerId = setTimeout(() => {
          setAlert({ isOpen: false });
        }, 3000);
      }
    }
  };

  return (
    <>
      <StyledControls>
        <GenerateGroup
          label="Bet Amount"
          value={amount}
          handleNumberChange={handleAmountChange}
          step={betStep}
          min={minBet}
          max={maxBet}
          disabled={!isRealMode || isRolling}
          ref={betAmount}
          ActionGenerator={GenerateAdvancedControls}
          ActionGeneratorProps={{
            value: amount,
            step: betStep,
            handler: handleAmountChange,
            min: minBet,
            max: maxBet,
            disabled: !isRealMode || isRolling,
          }}
        />
        <GenerateGroup
          label="Payout"
          value={payout(isRealMode, amount)}
          handleNumberChange={handleAmountChange}
          step={0.0001}
          min={minBet}
          max={maxPayout}
          disabled={!isRealMode || isRolling}
          readonly
          currencyName={currencyValue}
        />
        <StyledBtnRollContainer>
          <StyledButtonContainer>
            {isRealMode ? (
              data.loaded ? (
                data.account.address ? (
                    !isLoad && parseInt(allowanceState?.toString()) ? (
                      <>
                        <PrimaryButton
                          onClick={(e) => handleRollClick(e)}
                          disabled={!!(active || isRolling)}
                          type="button"
                        >
                          <RollDiceIcon /> &nbsp;
                          {isRolling ? "ROLLING" : "ROLL DICE"}
                        </PrimaryButton>
                        <PrimaryButton
                          className={active ? "active" : ""}
                          onClick={() => handleAutoRollClick()}
                          type="button"
                          mobilePadding="15px 50px 15px"
                          btnBorder="2px solid #FECB05"
                          btnBackgroundColor="#FFFFFF"
                          btnColor="#FEA549"
                        >
                          <AutoRollIcon />
                          <StyledDivider /> AUTOROLL
                        </PrimaryButton>
                      </>
                    ) : (
                      <PrimaryButton
                        btnPadding="17px 50px 17px"
                        onClick={() => handleApprove()}
                        disabled={approve}
                      >
                        {approve ? "Pending" : "Approve"}
                      </PrimaryButton>
                    )
                ) : (
                  <PrimaryButton
                    btnPadding="17px 50px 17px"
                    onClick={() => handleTronWebConnection()}
                  >
                    Connect
                  </PrimaryButton>
                )
              ) : (
                <p style={{ color: "black" }}>Loading...</p>
              )
            ) : (
              <>
                <PrimaryButton
                  type="button"
                  onClick={(e) => handleRollClick(e)}
                  disabled={!!(active || isRolling)}
                  mobilePadding="17px 50px 17px"
                >
                  <RollDiceIcon /> <StyledDivider />{" "}
                  {isRolling ? "ROLLING" : "ROLL DICE"}
                </PrimaryButton>
                <PrimaryButton
                  className={active ? "active" : ""}
                  onClick={(e) => handleAutoRollClick(e)}
                  type="button"
                  mobilePadding="15px 50px 15px"
                  btnBorder="2px solid #FECB05"
                  btnBackgroundColor="#FFFFFF"
                  btnColor="#FEA549"
                >
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.1176 3.39901L14.4502 2.28232C14.5117 2.0766 14.6504 1.90429 14.8359 1.80331C15.0214 1.70233 15.2385 1.68094 15.4395 1.74385C15.6404 1.80676 15.8087 1.94882 15.9073 2.13877C16.0059 2.32872 16.0268 2.55101 15.9654 2.75673L15.0387 5.85865C14.9773 6.06421 14.8387 6.2364 14.6533 6.33738C14.468 6.43835 14.2511 6.45984 14.0502 6.39712L11.0207 5.4483C10.9192 5.41903 10.8243 5.36928 10.7418 5.30196C10.6593 5.23464 10.5907 5.15112 10.5402 5.0563C10.4896 4.96147 10.4581 4.85726 10.4474 4.74978C10.4367 4.6423 10.4471 4.53372 10.478 4.43042C10.5088 4.32711 10.5596 4.23116 10.6272 4.1482C10.6947 4.06524 10.7778 3.99695 10.8716 3.94732C10.9653 3.8977 11.0678 3.86776 11.1729 3.85925C11.2781 3.85073 11.3839 3.86382 11.4841 3.89775L12.8083 4.31215C12.2229 3.40298 11.4063 2.67457 10.4466 2.20535C9.4868 1.73614 8.42019 1.5439 7.36162 1.64935C6.30306 1.7548 5.29264 2.15394 4.4392 2.80378C3.58575 3.45362 2.92162 4.32954 2.51833 5.3372L2.31241 5.85054C2.27495 5.95187 2.21805 6.04449 2.14506 6.12293C2.07206 6.20137 1.98446 6.26404 1.88741 6.30724C1.79037 6.35043 1.68586 6.37328 1.58005 6.37443C1.47424 6.37558 1.36927 6.35501 1.27136 6.31393C1.17344 6.27285 1.08456 6.2121 1.00995 6.13526C0.935349 6.05842 0.87654 5.96706 0.836998 5.86656C0.797455 5.76607 0.777981 5.65848 0.779726 5.55014C0.78147 5.44181 0.804398 5.33494 0.847156 5.23583L1.05308 4.7225C1.56491 3.44384 2.40723 2.33208 3.48958 1.50658C4.57193 0.681079 5.85344 0.173025 7.19651 0.0369673C8.53958 -0.0990907 9.89348 0.141986 11.1128 0.734313C12.3322 1.32664 13.3709 2.24784 14.1176 3.39901ZM1.82372 12.0057L1.56473 13.0689C1.54156 13.1743 1.49804 13.2739 1.43672 13.3619C1.3754 13.4499 1.29753 13.5244 1.20768 13.5811C1.11783 13.6379 1.01782 13.6756 0.913513 13.6922C0.809208 13.7088 0.70272 13.7038 0.600305 13.6777C0.497891 13.6515 0.401616 13.6047 0.317141 13.5399C0.232665 13.4751 0.161691 13.3936 0.108392 13.3003C0.0550919 13.207 0.0205411 13.1038 0.0067698 12.9966C-0.00700151 12.8895 0.000284461 12.7806 0.0281995 12.6764L0.79409 9.52985C0.819929 9.42272 0.866851 9.32212 0.931984 9.2342C0.997116 9.14628 1.07909 9.07289 1.17288 9.01853C1.26667 8.96418 1.37032 8.92999 1.47746 8.91807C1.5846 8.90615 1.693 8.91675 1.796 8.94921L4.82788 9.72286C5.03174 9.77491 5.20706 9.90775 5.31527 10.0922C5.42348 10.2766 5.45571 10.4974 5.40488 10.7061C5.35404 10.9149 5.22431 11.0944 5.04421 11.2052C4.86411 11.316 4.6484 11.349 4.44454 11.2969L3.02998 10.9361C3.63471 11.8839 4.4895 12.6369 5.4952 13.1075C6.5009 13.5781 7.61631 13.7472 8.71205 13.5951C9.80779 13.4429 10.8389 12.9759 11.6859 12.248C12.5329 11.5202 13.161 10.5614 13.4974 9.48282C13.529 9.38133 13.5799 9.28721 13.647 9.20583C13.7142 9.12446 13.7963 9.05742 13.8887 9.00854C13.9812 8.95967 14.0821 8.92992 14.1858 8.92099C14.2895 8.91206 14.3939 8.92413 14.493 8.95651C14.5921 8.98888 14.684 9.04093 14.7635 9.10968C14.843 9.17843 14.9085 9.26253 14.9562 9.35719C15.0039 9.45185 15.033 9.55521 15.0417 9.66136C15.0504 9.76752 15.0386 9.87439 15.007 9.97588C14.6773 11.035 14.1249 12.0072 13.3887 12.8242C12.6525 13.6411 11.7504 14.283 10.7459 14.7046C9.18072 15.3611 7.44366 15.4515 5.82152 14.9608C4.19939 14.4702 2.78918 13.4277 1.82372 12.0057Z"
                        fill="url(#paint0_linear)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="0"
                          y1="7.72913"
                          x2="16"
                          y2="7.72913"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" stopColor="#FDD50B" />
                          <stop offset="100%" stopColor="#FEA24C" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </>
                  <StyledDivider /> AUTOROLL
                </PrimaryButton>
              </>
            )}
          </StyledButtonContainer>
        </StyledBtnRollContainer>
        <Alert message={alert.message} alert={alert.isOpen} />
      </StyledControls>
      <Alert message={alert.message} alert={alert.isOpen} />
    </>
  );
}

export default BetControls;

const StyledBtnRollContainer = styled.div`
  border-radius: 40px 40px 0 0;
  grid-area: Button;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin: 0 auto 0;
  max-width: 100%;
  width: 100%;
  justify-content: space-around;

  .money-button-container {
    position: absolute;
    top: -22px;
    left: calc(50% - 80px);
  }

  &-note {
    color: #d4bdef;
    display: block;
    font-size: 12px;
    line-height: 1.33;
    margin: 8px auto;

    @media (min-width: 768px) {
      margin-bottom: 16px;
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  @media (max-width: 545px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

const StyledDivider = styled.div`
  width: 5px;
  height: auto;
  display: inline-block;
`;
