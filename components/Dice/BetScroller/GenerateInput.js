import styled from "styled-components";

const GenerateInput = ({value, label, onTypeChange, disabled, type}) => {
    const id = `inputType${value}`;
    return (
        <>
            <StyledTypePickerRadio
                id={id}
                className={`radio ${type}`}
                type="radio"
                name="type"
                value={value}
                onChange={e => onTypeChange(e.target.value)}
                checked={type === value}
                disabled={disabled}
            />
            <label htmlFor={id} className={`label ${type}`}>
                {label}
            </label>
        </>
    );
};

export default GenerateInput;

const StyledTypePickerRadio = styled.input`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &-title {
    font-size: 12px;
    font-weight: 800;
    line-height: 1.4;
    font-family: 'Montserrat', sans-serif;
    color: #d4bdef;
    text-shadow: 1px 4px 6px #2a0b4f, 0 1px 3px #6923ff, 1px 4px 6px #2a0b4f;

    &-number {
      display: block;
      text-align: center;
      color: #ece3f6;
      font-size: 20px;
      font-weight: 800;
    }
  }

`