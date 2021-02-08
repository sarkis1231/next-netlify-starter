import React from 'react'
import styled from 'styled-components'

function FairnessModal({ tabs, activeTab, onTabChange, gridTemplatesColumn }) {
    return (
        <StyledTabs gridTemplatesColumn={gridTemplatesColumn}>
            {tabs.map(key => (
                <StyledTabsBtn
                    className={`${activeTab === key && 'active'}`}
                    type="button"
                    key={key}
                    onClick={()=> onTabChange(key)}
                >
                    {key}
                </StyledTabsBtn>
            ))}
        </StyledTabs>
    )
}

export default FairnessModal

const StyledTabs = styled.nav`
  display: grid;
  grid-template-columns: ${({gridTemplatesColumn}) => gridTemplatesColumn ? gridTemplatesColumn : '1fr 1fr'};
  grid-gap: 16px;
  margin-bottom: 32px;
`
const StyledTabsBtn = styled.button`
  appearance: none;
  color: #BEBEC2;
  font-weight: 700;
  font-size: 14px;
  text-transform: capitalize;
  padding: 0;
  width: 100%;
  font-style: normal;
  padding-bottom: 13px;


  &.active {
    border-bottom: 4px solid #FEA24C;
    color: #242424;
  }
`