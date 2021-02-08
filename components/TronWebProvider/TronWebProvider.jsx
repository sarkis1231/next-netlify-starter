import React from 'react'
import {TronWebContext} from "../../context/tronWebContext";
import useTronWebConnection from "../../hooks/useTronWebConnection";
import useContract from "../../hooks/useContract";


const TronWebProvider = ({children}) => {

    const {account, loaded} = useTronWebConnection();
    const contract = useContract(account);
    return (
        <TronWebContext.Provider
            value={{
                account: account,
                loaded: loaded,
                contract: contract
            }}
        >
            {children}
        </TronWebContext.Provider>
    );
};

export default TronWebProvider;