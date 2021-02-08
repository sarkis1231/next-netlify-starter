import React, { useState, useEffect, Fragment } from "react";
import {
  load as _loadHistory,
  loadGames as _loadGames,
  clear as _clearHistory,
  searchFromTxId as _searchHistory,
} from "../../../../redux/modules/history";
import Modal from "../BaseModal";
import styled from "styled-components";
import { ReactComponent as CalenderIcon } from "../../../../assets/img/calender.svg";

function PreviousModal(props) {
  defaultProps = {
    historyData: [],
    btnClass: null,
  };

  const [open, setOpen] = useState(false);
  const [searchTxId, setSearchTxId] = useState("");

  const setSearchTxIdFunc = (searchTxId) => {
    setSearchTxId(searchTxId);
  };

  const loadMore = (page) => {
    const { lastLoadedGameId } = props;
    const args = { page };

    args.offset = lastLoadedGameId - 1;
    args.key = "data";
    args.size = 15;
  };

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const { searchHistory, historyData } = props;

    if (open && historyData.length <= 15) {
      loadMore();
    }

    if (searchTxId.length) {
      searchHistory(searchTxId);
    }
  }, [open, searchTxId]);

  return (
    <Fragment>
      <StyledBtn className={btnClass} type="button" onClick={toggle()}>
        <CalenderIcon />
      </StyledBtn>
      <Modal open={open} onClose={toggle()}>
        <p> Search TxID</p>
        <StyledSearchInput
          type="text"
          placeholder="TxID"
          onChange={(e) => setSearchTxIdFunc(e.target.value)}
          value={searchTxId}
        />
        {this.content}
      </Modal>
    </Fragment>
  );
}

export default PreviousModal;

const StyledBtn = styled.button`
  &.toolbar-btn {
    appearance: none;
    opacity: 0.6;
    margin-left: 16px;
    height: 24px;
    width: 24px;
    padding: 0;

    &:not(.btn-sound):hover {
      opacity: 1;
      transition: opacity 0.5s;
    }

    &-sound {
      opacity: 0.5;
      &.active {
        background: #593781;
        border-radius: 100%;
        opacity: 1 !important;
      }
    }
  }
`;
const StyledSearchInput = styled.input`
  height: 42px;
  line-height: 22px;
  padding: 14px 24px;
  border-radius: 8px;
  border: 1px transparent;
  background: linear-gradient(0deg, #ecf5f4, #ecf5f4);
  opacity: 0.7;
  color: #fff;
  width: 100%;
  margin-bottom: 27px;

  &::placeholder {
    color: #242424;
    font-family: "Mulish", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
  }
`;
