import React, {useRef, useState} from 'react'
import  ArrowDown from "../../assets/images/arrowDown.svg"
import styled, {css} from "styled-components"
import useOnClickOutside from "../../hooks/useOnClickOutside"

const options = [
    {name:"English", value:'EN'},
    {name: "Hindi", value: 'HI'},
    {name: "Persian", value: "FA"},
    {name: "Filipino", value: 'FIL'},
    {name: "Russian", value: 'RU'},
];

const LangSwitcher = () => {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const toggling = () => setOpen(!open);
    useOnClickOutside(ref, () => setOpen(false));
    const [selectedOption, setSelectedOption] = useState(null);
    const onOptionClicked = value => {
        setSelectedOption(value);
        setOpen(false);
    }
    return (
        <StyledLanguagesDiv onClick={toggling} toggleMenu={open} ref={ref}>
            <StyledDropDownHeader>{selectedOption || "EN"}</StyledDropDownHeader>
            <StyledDropDownList toggleMenu={open}>
                {options.map(({name, value})=>(
                    <StyledItem onClick={() => onOptionClicked(value)} key={Math.random()}>
                        {name}
                    </StyledItem>
                ))}
            </StyledDropDownList>
            <ArrowDown />
        </StyledLanguagesDiv>
    )
}

const StyledLanguagesDiv = styled.div`
    display: flex;
    cursor: pointer;
    justify-content: center;
    position: relative;
    z-index: 910;
    width: 50px;
    height: 21px;
    align-items: center;
    box-sizing: border-box;
    font-size: .875rem;
    font-weight: 400;
    @media (max-width: 920px) {
        margin-right: 25px;
    }

    svg {
        ${({ toggleMenu }) => toggleMenu
        ? css`
            transform: rotateZ(-180deg);
        `
        : css`
            transform: rotateZ(-360deg);
        `
        };
        transition: all ease .3s;
    }
`

const StyledDropDownHeader = styled.div`
    border: none;
    width: auto;
    padding: 0 10px;
    background: transparent;
    display: inline-block;
    appearance: none;
    background-repeat: no-repeat;
    background-position: center right;
    position: relative;
    cursor: pointer;
    color: #414141;
    font-family: 'Mulish', sans-serif;
    opacity: .8;
`

const StyledDropDownList = styled.ul`
    position: absolute;
    padding: 0;
    margin: 0;
    top: 20px;
    box-sizing: border-box;
    color: #414141;
    overflow: hidden;
    font-weight: 500;
    font-family: 'Mulish', sans-serif;
    border: 1px solid #ecf5f4;
    border-radius: 2px;
    background: #fff;
    ${({toggleMenu}) => toggleMenu ? 
        css`
            max-height: 220px;
            overflow: hidden;
            border: 1px solid #ecf5f4;
        `
        :
        css`
            max-height: 0;
            border: none;
        `
    };
    transition: all ease .3s;
`

const StyledItem = styled.li`
    padding: 5px 30px;
`

export default LangSwitcher;