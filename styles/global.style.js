import styled from "styled-components"

export const StyledH2 = styled.h2`
  color: ${({color})=>color ? color : "#252733"};
  font-size: 18px;
  font-family: "Ahimsa-Medium";
  font-weight: 500;
  line-height: 23px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledControls = styled.div`
  display: grid;
  font-family: "Ahimsa-Medium";
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
      "Bet Bet Bet Payout Payout Payout"
      "Button Button Button Button Button Button";
    grid-column-gap: 16px;
    grid-row-gap: 23px;
    grid-template-rows: 82px;
  }
  .addon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -8px;
    right: 0;
    border-radius: 0 4px 4px 0;
    overflow: hidden;
    padding: 0 0 8px 0;

    &-advaced {
      border-radius: 0;
      right: 50px;

      &:nth-of-type(2) {
        right: 100px;
      }
    }
  }
  @media (max-width: 585px) {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledControlsChild = styled(StyledControls)`
  @media (min-width: 586px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: "Multiplier Multiplier RollNumber RollNumber WinChance WinChance";
    grid-column-gap: 16px;
    grid-row-gap: 32px;
    grid-template-rows: 82px;
  }
  @media (max-width: 585px) {
    display: flex;
    flex-direction: column;
  }
  .addon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 6px;
    border-radius: 0 4px 4px 0;
    overflow: hidden;
    &-advaced {
      border-radius: 0;
      right: 50px;

      &:nth-of-type(2) {
        right: 100px;
      }
    }
    @media (max-width: 585px){
      top: 35px;
    }
  }
`

export const StyledNumberControlsBtn = styled.button`
  appearance: none;
  width: 100%;
  height: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #bebec2;
  border: none;
  stroke: #bebec2;
  padding: 0 11px 13px 0;
  @media (max-width: 585px) {
    padding: 0 11px 8px 0;
    :nth-child(1){
      padding-top: 10px;
    };
    :nth-child(2){
      padding-bottom: 5px;
    };
  }
  &:hover {
    background: rgba(#3c1b63, 0.6);
    transition: background 0.1s;
  }
  &:focus {
    outline: none;
  }
`;