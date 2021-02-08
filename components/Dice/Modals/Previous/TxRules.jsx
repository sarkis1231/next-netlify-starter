import React, { useState } from "react";
import styled from "styled-components";

function TxRules(props) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    setExpanded(!expanded);
  };

  const { data } = props;

  return (
    <tbody>
      <tr>
        <td className="text-left">
          <b>{data.game_id}</b>
        </td>
        <td className="text-left">{data.result}</td>
        <td className="text-right">
          <b>{Math.max(data.winner_balance, 0).toFixed(6)}</b>
        </td>
        <td className="text-right">
          {data.winner_balance > 0 ? (
            <StyledDetailsBtn
              className={`${{ rotate: expanded }}`}
              type="button"
              onClick={toggle()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M2.1 7.22L2 7.06l.76-.56.1.15c2.61 3.7 5.7 7 9.2 9.82a48.08 48.08 0 009.07-9.8l.11-.17.76.56-.11.16a49.02 49.02 0 01-9.43 10.14c-.23.19-.57.19-.8 0A49.6 49.6 0 012.1 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </StyledDetailsBtn>
          ) : null}
        </td>
      </tr>
      {expanded
        ? [
            <StyledTrSubheader key={`sub${data.game_id}`}>
              <th />
              <th className="text-left">TxID</th>
              <th className="text-right">Prize (BSV)</th>
              <th />
            </StyledTrSubheader>,
            ...data.winner_list.map((d) => (
              <tr key={d.tx_id}>
                <td />
                <td className="text-left">
                  <a
                    href={d.tx_id_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>
                      {d.tx_id.slice(0, 6)}...{d.tx_id.slice(-2)}
                    </b>
                  </a>
                </td>
                <td className="text-right">
                  {d.payout_tx_id_url ? (
                    <a
                      href={d.payout_tx_id_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <b>{Math.max(d.payout_balance, 0).toFixed(6)}</b>
                    </a>
                  ) : (
                    <b>{Math.max(d.payout_balance, 0).toFixed(6)}</b>
                  )}
                </td>
                <td />
              </tr>
            )),
          ]
        : null}
    </tbody>
  );
}

export default TxRules;

const StyledTrSubheader = styled.tr`
  height: 16px;
  th {
    height: 16px;
    padding: 8px 16px 0;
  }
`;
const StyledDetailsBtn = styled.button`
  height: 24px;
  width: 24px;
  transition: transform 0.1s;

  &.rotate {
    transform: rotate(180deg);
  }
`;
