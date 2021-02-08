import { useCallback, useEffect, useState } from "react";
import DiceRoll from '../contracts/DiceRoll.json';

function useContract(account) {
  const [contract, setContract] = useState({ loaded: false });
  const contractCall = useCallback(async () => {
    if (window.tronWeb && Object.keys(account).length) {
      try {
        const diceContract = window.tronWeb.contract(DiceRoll.entrys, 'THdgAUtq41h7wNEMcyLg6Z1je1WkpybrFC');
        setContract(prev => ({ ...prev, diceContract, loaded: true }));
      } catch (e) {
        console.error(e);
      }
    } else {
        setContract(() => ({ loaded: false }));
      }
    }, [account]);

  useEffect(() => {
    contractCall();
  }, [contractCall]);

  return contract;
}

export default useContract;
