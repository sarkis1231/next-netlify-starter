import React, { forwardRef } from "react";
import InputGroup from "./InputGroup";

const GenerateGroup = forwardRef(
  function ({
    label,
    value,
    handleNumberChange,
    step,
    ActionGenerator = () => null,
    ActionGeneratorProps,
    min = Number.MIN_VALUE,
    max = Number.MAX_VALUE,
    disabled,
    format = (v) => v,
    readonly = false,
    hint = null,
    nextInput = null,
    handleRef = () => { },
    currencyName,
  },
    ref) {
    return (
      <InputGroup
        label={label}
        value={value}
        handleNumberChange={handleNumberChange}
        ActionGenerator={ActionGenerator}
        ActionGeneratorProps={ActionGeneratorProps}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
        format={format}
        readonly={readonly}
        hint={hint}
        nextInput={nextInput}
        ref={ref}
        handleRef={handleRef}
        currencyName={currencyName} />
    );
  }
);

export default GenerateGroup;
