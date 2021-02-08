import APE from "../../contracts/APE.json";
import LemurMaster from "../../contracts/LemurMaster.json";
import { APE_ADDRESS, DICE_ADDRESS, LEMUR_ADDRESS, LEMUR_MASTER_ADDRESS } from "../../constants/address";
import sleep from "../sleep";

export async function getLemurSupply() {
  if (!window.tronWeb) {
    return 0;
  }
  const contract = window.tronWeb.contract(APE, LEMUR_ADDRESS);
  try {
    return window.tronWeb.fromSun(await contract.totalSupply().call({
      from: window.tronWeb.defaultAddress.base58,
    }));
  } catch (e) {
    console.error(e)
  }
}

export async function getApeWagerRate() {
  if (!window.tronWeb) {
    return 0;
  }
  const contract = window.tronWeb.contract(LemurMaster, LEMUR_MASTER_ADDRESS);
  try {
    return await contract.apeWagerMultiplier().call({
      from: window.tronWeb.defaultAddress.base58,
    });
  } catch (e) {
    console.error(e)
  }
}

export async function getTrxWagerRate() {
  if (!window.tronWeb) {
    return 0;
  }
  const contract = window.tronWeb.contract(LemurMaster, LEMUR_MASTER_ADDRESS);
  try {
    return await contract.trxWagerMultiplier().call({
      from: window.tronWeb.defaultAddress.base58,
    });
  } catch (e) {
    console.error(e)
  }
}

export async function lemurBalanceFunc() {
  if (!window.tronWeb) {
    return 0;
  }
  const contract = window.tronWeb.contract(APE, LEMUR_ADDRESS);
  try {
    return window.tronWeb.fromSun(await contract.balanceOf(window.tronWeb.defaultAddress.base58).call({
      from: window.tronWeb.defaultAddress.base58,
    }));
  } catch (e) {
    console.error(e)
  }
}

export async function apeBalanceFunc() {
  if (!window.tronWeb) {
    return 0;
  }
  const contract = window.tronWeb.contract(APE, APE_ADDRESS);
  try {
    return window.tronWeb.fromSun(await contract.balanceOf(window.tronWeb.defaultAddress.base58).call({
      from: window.tronWeb.defaultAddress.base58,
    }));
  } catch (e) {
    console.error(e)
  }
}

export async function trxBalanceFunc() {
  if (!window.tronWeb) {
    return 0;
  }
  try {
    return window.tronWeb.fromSun(await window.tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58));
  } catch (e) {
    console.error(e)
  }
}

export async function apeApprove() {
  const apeContract = window.tronWeb.contract(APE, APE_ADDRESS);
  try {
    await apeContract.approve(
      DICE_ADDRESS,
      '115792089237316195423570985008687907853269984665640564039457584007913129639935'
    ).send({
      from: window.tronWeb.defaultAddress.base58,
    });
    return await pollAllowance();
  } catch (e) {
    console.error(e)
  }
}

export async function apeAllowance() {
  const apeContract = window.tronWeb.contract(APE, APE_ADDRESS);
  let allowance;
  try {
    allowance = await apeContract.allowance(
      window.tronWeb.defaultAddress.base58,
      DICE_ADDRESS
    ).call();
  } catch (e) {
    console.error(e)
  }

  return allowance;
}

export async function pollAllowance() {
  const res = await allowance();
  try {
    res.toNumber();
    await sleep(1000);
    return pollAllowance();
  } catch {
    return res;
  }
}

