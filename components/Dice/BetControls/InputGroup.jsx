import React, { useState, useEffect, forwardRef } from "react";
import minmax from "../../../utils/minmax";
import styled from "styled-components";
import { usePrevious } from "../../../hooks/usePrevious";

const InputGroup = forwardRef(
  (
    {
      label,
      handleNumberChange,
      ActionGenerator = () => {},
      ActionGeneratorProps,
      step = 1,
      min = Number.MIN_VALUE,
      max = Number.MAX_VALUE,
      disabled,
      format,
      readonly,
      hint,
      maxLength,
      currencyName,
      value,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(0);
    const [focused, setFocused] = useState(false);
    const slug = label?.split(" ")[0].toLowerCase();
    const id = `input${slug}`;
    const prevValue = usePrevious(value);
    useEffect(() => {
      if (prevValue !== value) {
        setInputValue(() => value);
      }
    }, [value]);
    const handleValueChange = (value) => {
      setInputValue(() => value);
    };

    const handleInputFocus = (focused) => {
      setFocused(() => focused);
    };

    const handleInputBlur = () => {
      if (inputValue !== value) {
        handleNumberChange(minmax(inputValue, min, max));
      }
      handleInputFocus(false);
    };

    const handleKeyDown = (event) => {
      if (event.target.value.length >= maxLength) {
        event.preventDefault();
      }
      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        handleNumberChange(minmax(inputValue, min, max));
        ref.current.blur();
        if (event.key === "Tab") {
          if (ref) {
            handleNumberChange(minmax(inputValue, min, max));
            return ref.current.focus();
          }
        }
      }
    };

    return (
      <StyledControlsGroup
        className={`controls-group controls-group-${slug} ${disabled}`}
      >
        <label htmlFor={id} className="label">
          {label}
          {hint}
        </label>
        <input
          id={id}
          className={`input input-${slug}`}
          ref={ref}
          value={focused ? inputValue : format(value)}
          type={focused ? "number" : "text"}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          step={step}
          min={min}
          max={max}
          onFocus={() => handleInputFocus(true)}
          onBlur={() => handleInputBlur()}
          disabled={disabled}
          readOnly={readonly}
          maxLength={maxLength}
        />
        {currencyName && (
          <StyledCurrencyName>{currencyName}</StyledCurrencyName>
        )}
        <ActionGenerator {...ActionGeneratorProps} />
      </StyledControlsGroup>
    );
  }
);

export default InputGroup;

const StyledControlsGroup = styled.fieldset`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }

input[type="number"] {
  -moz-appearance: textfield;
}

input:read-only{
  cursor: unset;
  outline: none;
}

&.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "Bet Bet"
    "Button Button"
    "Separator Separator"
    "Multiplier RollNumber"
    "WinChance Payout";
  grid-row-gap: 16px;
  grid-column-gap: 8px;
  min-height: 100%;

  @media (min-width: 586px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "Multiplier Multiplier RollNumber RollNumber WinChance WinChance"
      "Separator Separator Separator Separator Separator Separator"
      "Payout Payout Payout Bet Bet Bet"
      "Button Button Button Button Button Button";
    grid-column-gap: 16px;
    grid-row-gap: 32px;
    grid-template-rows: 82px;
  }

  &-group {
    position: relative;
    border: 0;
    padding: 0;
    width: 100%;

    @media (max-width: 525px){
      margin-bottom: 10px;
    }

    &.disabled {
      opacity: 0.5;
    }

    &-multiplier {
      grid-area: Multiplier;
    }

    &-roll {
      grid-area: RollNumber;
    }

    &-win {
      grid-area: WinChance;
    }

    &-payout {
      grid-area: Payout;
    }

    &-bet {
      grid-area: Bet;
    }

    &-payout:before,
    &-bet:before {
      content: "";
      position: absolute;
      display: block;
      bottom: 0;
      left: 24px;
      height: 60px;
      width: 16px;
      font-size: 18px;
      font-weight: bold;
      line-height: 1.56;
      z-index: 10;
    }
  }

    &-bet,
    &-payout {
      padding-left: 56px;
    }
  }
}
  .label {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -0.2px;
    color: #242424;
    display: block;
    font-style: normal;
    font-weight: 700;
    padding: 0 0 15px 0;
  }
  .input {
    font-family: 'Mulish', sans-serif;
    font-style: normal;
    background: linear-gradient(0deg, #ECF5F4, #ECF5F4);
    border-radius: 8px;
    opacity: 0.7;
    border: 1px solid transparent;
    color: rgba(36, 36, 36, 0.5);
    position: relative;
    padding: 8px 0 8px 18px;
    font-size: 14px;
    font-weight: 600;
    line-height: 25px;
    display: block;
    width: 100%;
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    &-addon {
      stroke: #BEBEC2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 56px;
      width: 48px;
      margin: 2px;
      border-radius: 0 4px 4px 0;
      overflow: hidden;

      &-advaced {
        border-radius: 0;
        right: 50px;

        &:nth-of-type(2) {
          right: 100px;
        }
      }
    }
  
`;

const StyledCurrencyName = styled.span`
  color: #242424;
  /* font-family: "Mulish", sans-serif; */
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  position: absolute;
  right: 14px;
  top: 45px;
`;
