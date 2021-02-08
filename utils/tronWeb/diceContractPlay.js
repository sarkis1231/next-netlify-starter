import DiceRoll from "../../contracts/DiceRoll.json";
import sleep from "../sleep";
import { DICE_ADDRESS } from "../../constants/address";


export async function diceContractPlay(betNumber, betType, betAmount, currencyValue, onSend = () => {}) {

  let game;
  try {
    const seed = (Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)).substr(0, 32);

    const diceContract = window.tronWeb.contract(DiceRoll.entrys, DICE_ADDRESS);
    if (currencyValue === 'APE') {
      await diceContract.playWithApe(betNumber, betType === 'over', window.tronWeb.fromAscii(seed), betAmount * Math.pow(10, 6)).send({
        from: window.tronWeb.defaultAddress.base58,
      });
    } else {
      await diceContract.play(betNumber, betType === 'over', window.tronWeb.fromAscii(seed)).send({
        callValue: window.tronWeb.toSun(betAmount),
        from: window.tronWeb.defaultAddress.base58,
      });
    }

    onSend();

    game = await pollGame(diceContract, seed);
  } catch (e) {
    console.error(e);
  }

  return game;
}

async function pollGame(contract, seed) {
  const game = await contract.games(window.tronWeb.fromAscii(seed)).call();
  if (game.state === 0) {
    await sleep(1000);
    return pollGame(contract, seed);
  }
  return game;
}
