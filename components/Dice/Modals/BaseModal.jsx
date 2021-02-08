import React, { Fragment, useEffect } from "react";
import styled from "styled-components";

function scrollingElement() {
  return document.scrollingElement || document.documentElement;
}

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function Modal({ open, children, onClick }) {

  useEffect(() => {
    if (open) {
      scrollingElement().style.paddingRight = `${getScrollbarWidth()}px`;
      scrollingElement().style.overflow = "hidden";
    } else {
      scrollingElement().style.overflow = "auto";
      scrollingElement().style.paddingRight = 0;
    }
  }, [open]);

  return (
    <Fragment>
      <StyledModal className={`${open && "open"}`}>
        <StyledCloseContainer>
          <StyledClose
            type="button"
            onClick={onClick}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 16"
            >
              <defs />
              <path
                fill="#242424"
                d="M14.6 1.8L1.8 14.6a.3.3 0 01-.4-.4L14.2 1.4a.3.3 0 11.4.4z"
              />
              <path
                fill="#242424"
                d="M1.8 1.4l12.8 12.8a.3.3 0 01-.4.4L1.4 1.8a.3.3 0 11.4-.4z"
              />
            </svg>
          </StyledClose>
        </StyledCloseContainer>
        {children}
      </StyledModal>
      <StyledBackDrop
        type="buttom"
        className={`${open && "open"}`}
        onClick={onClick}
        aria-label="Close"
      />
    </Fragment>
  );
}

export default Modal;

const StyledModal = styled.div`
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(50, 50, 93, 0.1);
  border: 2px solid #43bc9c;
  border-radius: 12px;
  color: #fff;
  position: fixed;
  left: 0;
  top: 100px;
  width: 100%;
  max-width: 384px;
  max-height: 65%;
  overflow: auto;
  margin: 0 auto;
  padding: 40px 16px 50px;
  opacity: 0;
  transform: scale(0);
  z-index: -1;

  @media (min-width: 400px) {
    top: 100px;
    left: calc(50% - 193px);
    max-height: calc(100% - 160px);
    padding: 40px 32px 50px;
  }

  &.open {
    opacity: 1;
    z-index: 10001;
    transform: scale(1);
    transition: opacity 0.3s ease 0.2s, transform 0.5s;
  }

  h2 {
    margin: 0 0 8px;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
  }

  p {
    font-size: 12px;
    line-height: 14px;
    margin: 14px 0 14px;
    color: #242424;
    font-family: "Mulish", sans-serif;
    font-style: normal;
    font-weight: 400;

    &.rules-step-text {
      margin: 24px 0;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #ffffff;
    }
  }

  blockquote {
    background: #f2f8f7;
    border-radius: 2px;
    color: #242424;
    display: inline-block;
    font-weight: 700;
    font-size: 14px;
    margin: 8px 0 24px;
    padding: 16px;
    width: 100%;
  }
`;
const StyledClose = styled.button`
  position: absolute;
  bottom: 15px;
  right: -15px;
  /* padding: 8px; */
  height: 20px;
  width: 20px;
  svg {
    stroke: #242424;
    height: 12px;
    width: 12px;
  }
  @media (max-width: 400px) {
    right: 0;
  }
`;
const StyledBackDrop = styled.button`
  background: linear-gradient(180deg, #e2efed 0%, #f2f6f8 100%);
  cursor: default;
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1000;
  transform: scale(0);

  &.open {
    opacity: 0.4;
    z-index: 10000;
    transform: scale(1);
    transition: opacity 0.1s ease 0.1s, transform 0.2s;
  }
`;
const StyledCloseContainer = styled.div`
  position: sticky;
  top: 0;
`;
