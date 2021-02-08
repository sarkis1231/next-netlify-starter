import { useEffect, useState } from "react";

function useTronWebConnection() {
  const [account, setAccount] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    if (!window.tronWeb || !window.tronWeb.ready) {
      setLoaded(() => true);
    }

    const obj = setInterval(async () => {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const address = window.tronWeb.defaultAddress.base58;
        const balance = window.tronWeb.fromSun(await window.tronWeb.trx.getBalance(address), 'trx');
        setAccount(prev => ({ ...prev, address, balance }))
        setLoaded(() => true);
        clearInterval(obj)
      }
    }, 1000);
  }, []);

  return { account, loaded };

}

export default useTronWebConnection;
