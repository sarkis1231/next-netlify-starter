import React, { memo } from "react";
import { connect } from "react-redux";
import { handleClickWindowOpen } from "../../../../utils/handleClick";
import styled from "styled-components";

function Verify(props) {


  const { historyData } = props;

  return (
    <StyledVerifyTable>
      <thead>
        <tr>
          <th>Round ID</th>
          <th>
            <span className="hide-mobile">Round </span>Seed Hash
          </th>
          <th>Result</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {historyData.map((data) => (
          <tr key={data.game_id}>
            <td className="text-left">{data.game_id}</td>
            <td>
              <span className="verifyHash">{data.seed_hash}</span>
            </td>
            <td>{data.game_result || "---"}</td>
            <td>
              <button
                className="verifyBtn"
                type="button"
                onClick={handleClickWindowOpen(
                  `/games/dice/fairness/verify/?game=${data.game_id}`
                )}
              >
                Verify
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledVerifyTable>
  );
}

const mapStateToProps = (state) => {
  return {
    oldGame: state.info.oldGame,
    game: state.info.game,
    historyData: [],
  };
};

export default connect(mapStateToProps, {})(memo(Verify));

const StyledVerifyTable = styled.table`
  width: 100%;

  tbody tr:nth-child(2n + 1) {
    background: #f2f8f7;
  }

  th,
  tr {
    text-align: left;
    &:last-child {
      text-align: right;
    }
  }

  th {
    color: #8b8e8d;
    font-size: 11px;
    font-weight: 400;
    font-family: "Mulish", sans-serif;
    font-style: normal;
    width: auto;
    text-align: left;
  }

  td {
    font-size: 14px;
    font-weight: bold;
    line-height: 18px;
    height: 18px;
    padding: 10px 16px;
  }

  .verifyBtn {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }

  .verifyHash {
    font-size: 12px;
    font-weight: normal;
    display: block;
    max-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (min-width: 500px) {
      max-width: 150px;
    }
  }
`;
