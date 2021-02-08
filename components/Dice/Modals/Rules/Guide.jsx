import React, {useState, useEffect, Fragment} from "react";
import styled from "styled-components";
import PrimaryButton from "../../../Dice/PrimaryButton/PrimaryButton";
import ImageStep1 from "../../../../public/assets/images/rules-1.png";
import ImageStep2 from "../assets/assets/rules-2.png";
import ImageStep3 from "../assets/assets/rules-3.png";

const P = styled.p`
  font-size: 14px;
  margin: 0 0 8px;

  &.rules-step-text {
    margin: 24px 0;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
  }
`;

const STEPS = [
    <div>
        <img src={ImageStep1} alt="" style={{maxWidth: "100%"}}/>
        <P>
            Start by setting your Bet Amount.
            <br/>
            You can set Win Chance, Prediction Number and Multiplier by using the
            slider.
        </P>
    </div>,
    <div>
        <img src={ImageStep2} alt="" style={{maxWidth: "100%"}}/>
        <P>
            You can also adjust parameters manually by changing input values. After
            you are ALL set, place your bet and swipe the MONEYBUTTON to start the
            game.
        </P>
    </div>,
    <div>
        <img src={ImageStep3} alt="" style={{maxWidth: "100%"}}/>
        <P>
            Roll starts and “one” number will be drawn from 0 to 9999. You win if the
            roll outcome is within the chosen area.
        </P>
    </div>,
];

function Guide({onClose, open}) {
    const [step, setStep] = useState(1);


    useEffect(() => {
        let timeId = 0;
        if (!open) {
            timeId = setTimeout(() => {
                setStep(1);
            }, 100);
        }
        return () => {
            clearTimeout(timeId);
        }
    }, [open]);


    const nextStep = () => {
        setStep(step + 1);
    };


    return (
        <Fragment>
            <div>{STEPS[step - 1]}</div>
            {step < STEPS.length ? (
                <PrimaryButton
                    btnMargin="auto"
                    onClick={() => nextStep()}
                    text={`Next Step ${step}/3`}
                    block
                />
            ) : (
                <PrimaryButton
                    btnMargin="auto"
                    onClick={() => onClose()}
                    text="Play Now"
                    block
                />
            )}
        </Fragment>
    );
}

export default Guide;
