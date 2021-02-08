import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TronWebContext } from "../../../context/tronWebContext";
import { TABS } from "./tabs"
import checkDuplicatedId from "../../../utils/checkDuplicatedId";

export default function History({
  all = [],
  myGames = [],
  highRollers = [],
  currencyType = "",
}) {
  const [activeTab, setActivTab] = useState(0);
  const contextType = useContext(TronWebContext);
  let checkedMyGames = checkDuplicatedId(myGames)
  let checkedAll = checkDuplicatedId(all)
  let checkedHighRollers = checkDuplicatedId(highRollers)
  const gameRow = (game) => {
    const { id, area, bet, choice, currency, prize, result } = game;

    const won = window?.tronWeb?.fromSun(prize.toFixed(6)) > 0;
    const under = area !== "over";
    const multiplier =
      window.tronWeb.fromSun(prize) / window.tronWeb.fromSun(bet);
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>
          {window.tronWeb.fromSun(bet)} {currency}
        </td>
        <td>x {multiplier.toFixed(4)}</td>
        <td>
          {under ? "<" : ">"} {choice}
        </td>
        <td>
          {result}
        </td>
        <td className={`${won ? "won" : "lost"}`}>
          {window.tronWeb.fromSun(prize.toFixed(6))} {currency}
        </td>
      </tr>
    );
  };


  const setTab = (activeTab) => {
    setActivTab(activeTab);
  };

  const {
    loaded,
  } = contextType;

  return (
    <div>
      <StyledNav>
        {TABS.map(({ key, title }, ind) => (
          <StyledTabsBtn
            key={key}
            className={`${activeTab === ind ? "active" : ""}`}
            type="button"
            onClick={() => setTab(ind)}
          >
            {title}
          </StyledTabsBtn>
        ))}
      </StyledNav>
      <StyledTable currencyType={currencyType}>
        <thead>
          <tr>
            <th>Round Id</th>
            <th>Amount</th>
            <th>Multiplier</th>
            <th>Game</th>
            <th>Roll</th>
            <th>Payout</th>
          </tr>
        </thead>
        {TABS[activeTab].key === "mygames" && (
          <tbody>
            {myGames.length && loaded && contextType.contract.diceContract?.tronWeb ? checkedMyGames.map(gameRow) : null}
          </tbody>
        )}
        {TABS[activeTab].key === "all" && (
          <tbody>
            {all.length && loaded && contextType.contract.diceContract?.tronWeb ? checkedAll.map(gameRow) : null }
          </tbody>
        )}
        {TABS[activeTab].key === "highrollers" && (
          <tbody>
            {highRollers.length && loaded && contextType.contract.diceContract?.tronWeb
              ? checkedHighRollers.map(gameRow)
              : null}
          </tbody>
        )}
      </StyledTable>
    </div>
  );
}

const StyledTable = styled.table`
  width: 100%;
  background: #ffffff;
  tbody tr:nth-child(2n + 2) {
    background: #f2f8f7;
  }

  tr {
    width: 100%;
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }

  th,
  td {
    &:nth-child(2),
    &:nth-child(4),
    &:nth-child(5) {
      display: none;
      @media (min-width: 768px) {
        display: table-cell;
      }
    }
    @media (max-width: 768px) {
      width: 33%;
      margin: 0;
      text-align: center;
    }
  }

  th {
    @media (min-width: 320px) {
      font-size: 14px;
      font-family: "Mulish", sans-serif;
      font-weight: 700;
      font-style: normal;
      padding: 24px 0 14px;
      height: 54px;
      color: #252733;
      opacity: 0.3;
      text-align: center;
    }
  }

  td {
    font-size: 14px;
    font-family: "Mulish", sans-serif;
    font-weight: 600;
    font-style: normal;
    line-height: 20px;
    padding: 12px 24px;
    color: #252733;
    text-align: center;
    display: flex;
    justify-content: center;

    &.won {
      width: 100%;
      max-width: 140px;
      margin: auto;
      color: #ffffff;
      background: #83c9b6;
      border-radius: 100px;
      text-align: center;
      font-family: "Mulish", sans-serif;
      font-weight: 700;
      font-style: normal;
      font-size: 11px;
      padding: 6px 20px 4px 20px;
      right: 20px;
      bottom: 6px;
    }

    &.lost {
      width: 100%;
      max-width: 140px;
      margin: auto;
      color: #ffffff;
      background: #ed6567;
      border-radius: 100px;
      text-align: center;
      font-family: "Mulish", sans-serif;
      font-weight: 700;
      font-style: normal;
      font-size: 11px;
      padding: 6px 20px 4px 20px;
      right: 20px;
      bottom: 6px;
    }
  }
  .text-center {
    text-align: center;
  }
`;

const StyledNav = styled.nav`
  background: #fff;
  border-bottom: 1px solid rgba(212, 189, 239, 0.3);
  display: flex;
  justify-content: center;
  height: 54px;
`;

const StyledTabsBtn = styled.button`
  appearance: none;
  color: #252733;
  opacity: 0.3;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  position: relative;
  text-align: center;
  padding: 0 27px;
  height: 54px;
  &:focus,
  &::-moz-focus-inner {
    text-decoration: none;
    border: 0;
    outline: none;
    box-shadow: none;
  }
  &:after {
    background: linear-gradient(90deg, #fdd50b 0%, #fea24c 100%);
    border-radius: 2px 2px 0 0;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0;
    width: 100%;
  }

  &.active {
    opacity: 1;
    &:after {
      height: 4px;
    }
  }
`;
