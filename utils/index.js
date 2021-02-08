import {DICE} from "./defines";
import numberFormat from "./numberFormat";

export const  chance = (number, type) =>  {
    let chance;

    if (type === 'over') {
        chance = ((DICE._MAX_NUMBER - number) / DICE._MAX_NUMBER) * 100;
    } else {
        chance = (number / DICE._MAX_NUMBER) * 100;
    }

    return numberFormat(chance, 4);
}

export function multiplier(number,type, callback) {
    return numberFormat((100 - DICE._EDGE) / callback(number, type), 4);
}
