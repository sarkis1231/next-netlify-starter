import React, { useEffect } from "react";
import minmax from "../../../utils/minmax";
import { DICE } from "../../../utils/defines";
import numberFormat from "../../../utils/numberFormat";
import { isMobileOnly } from "react-device-detect";
import { ReactComponent as RollIcon } from "../../../assets/img/roll.svg";
import GenerateGroup from "./GenerateGroup";
import GenerateControls from "./GenerateControls.jsx"
import { StyledNumberControlsBtn, StyledControlsChild } from "../../../styles/global.style"

function BetInputs(props) {
  const {
    amount,
    number,
    type,
    isRolling,
    onTypeChange,
    onAmountChange,
    maxPayout,
    betStep,
    minNumber,
    maxNumber,
    decimals,
    loading,
    minBet,
    onNumberChange,
  } = props;

  let inputRoll = React.createRef();
  let inputBet = React.createRef();
  let inputChance = React.createRef();
  let inputMultiplier = React.createRef();

  const multiplier = () => {
    let chance;
    if (type === "over") {
      chance = ((DICE._MAX_NUMBER - number) / DICE._MAX_NUMBER) * 100;
    } else {
      chance = (number / DICE._MAX_NUMBER) * 100;
    }
    return numberFormat((100 - DICE._EDGE) / chance, 4);
  };

  const chance = () => {
    return numberFormat((100 - DICE._EDGE) / multiplier(), 2);
  };

  const handleNumberChange = (v) => {
    if(v)
    onNumberChange(v);
  };

  const handleMultiplierChange = (v) => {
    let value = (0.99 / v) * DICE._MAX_NUMBER;

    if (type === "over") {
      value = 10000 - value;
      value = v <= multiplier() ? Math.floor(value) : Math.ceil(value);
    } else {
      value = v > multiplier() ? Math.floor(value) : Math.ceil(value);
    }
    handleNumberChange(value);
  };

  const handleBetSwap = () => {
    onTypeChange(type === "over" ? "under" : "over");

    handleNumberChange(10000 - number);
  };

  const handleWinChanceChange = (v) => {
    const winChance = v / 100;
    let value;
    if (type === "over") {
      value = DICE._MAX_NUMBER - DICE._MAX_NUMBER * winChance;
      value = v > winChance ? Math.floor(value) : Math.ceil(value);
    } else {
      value = (winChance * DICE._MAX_NUMBER);
      value = v < chance() ? Math.floor(value) : Math.ceil(value);
    }
    return handleNumberChange(value);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    const round = 10 ** decimals;
    const maxBet = maxPayout / multiplier();
    let newAmount = minmax(amount, minBet, maxBet);
    newAmount = Math.floor(newAmount * round) / round;
    onAmountChange(newAmount);
  }, [amount]);

  let minChance;
  let maxChance;
  if (type === "over") {
    minChance = numberFormat(
      ((DICE._MAX_NUMBER - maxNumber) / DICE._MAX_NUMBER) * 100,
      decimals
    );
    maxChance = numberFormat(
      ((DICE._MAX_NUMBER - minNumber) / DICE._MAX_NUMBER) * 100,
      decimals
    );
  } else {
    minChance = numberFormat((minNumber / DICE._MAX_NUMBER) * 100, decimals);
    maxChance = numberFormat((maxNumber / DICE._MAX_NUMBER) * 100, decimals);
  }

  return (
    <StyledControlsChild>
      <GenerateGroup
        label="Multiplier"
        value={multiplier()}
        handleNumberChange={handleMultiplierChange}
        step={betStep}
        ActionGenerator={GenerateControls}
        ActionGeneratorProps={{
          step: betStep,
          value:multiplier(),
          min: numberFormat((100 / maxChance) * 0.99, decimals),
          max: numberFormat((100 / minChance) * 0.99, decimals),
          format: (v) => `x ${v}`,
          handler:handleMultiplierChange,
        }}
        min={minChance}
        max={maxChance}
        format={(v) => `x ${v}`}
        disabled={isRolling}
        nextInput={inputRoll}
        handleRef={(ref) => {
          inputMultiplier = ref;
        }}
        ref={inputMultiplier}
      />
      <GenerateGroup
        label={`Roll ${type}`}
        value={number}
        handleNumberChange={handleNumberChange}
        min={minNumber}
        max={maxNumber}
        disabled={isRolling}
        handleRef={(ref) => {
          inputRoll = ref;
        }}
        ref={inputRoll}
        nextInput={inputChance}
        ActionGenerator={() => (
          <div className="addon">
            <StyledNumberControlsBtn
              type="button"
              onClick={() => handleBetSwap()}
            >
              <RollIcon />
            </StyledNumberControlsBtn>
          </div>
        )}
      />
      <GenerateGroup
        label={"Win Chance"}
        value={chance()}
        handleNumberChange={handleWinChanceChange}
        step={0.01}
        ActionGenerator={GenerateControls}
        ActionGeneratorProps={{
          step: 0.01,
          value:chance(),
          min: numberFormat(minChance, decimals),
          max: numberFormat(maxChance, decimals),
          format: (v) => `x ${v}`,
          handler:handleWinChanceChange,
        }}
        min={minChance}
        max={maxChance}
        disabled={isRolling}
        format={(v) => `${v}%`}
        handleRef={(ref) => {
          inputChance = ref;
        }}
        ref={inputChance}
        nextInput={!isMobileOnly ? inputBet : null}
      />
    </StyledControlsChild>
  );
}

export default BetInputs;
