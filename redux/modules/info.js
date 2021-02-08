import BigNumber from 'bignumber.js';
import { toCashAddress } from 'bchaddrjs';
// import config from 'config';

const LOAD = 'game/info/LOAD';
const LOAD_SUCCESS = 'game/info/LOAD_SUCCESS';
const LOAD_FAIL = 'game/info/LOAD_FAIL';
const GET_ACCESS_AVAILABLE = 'game/info/GET_ACCESS_AVAILABLE';
const GET_ACCESS_AVAILABLE_SUCCESS = 'game/info/GET_ACCESS_AVAILABLE_SUCCESS';
const GET_ACCESS_AVAILABLE_FAIL = 'game/info/GET_ACCESS_AVAILABLE_FAIL';

const SAVE_TOAST = 'game/info/SAVE_TOAST';
const CLEAR_SAVED_TOAST = 'game/info/CLEAR_SAVED_TOAST';
const SET_SHOW_STATISTICS = 'game/info/SET_SHOW_STATISTICS';

const defaultMaintenance = {
    landing: false,
    lottery: false,
    turtlerace: false,
    laddergame: false,
    baccarat: false,
    dice: false,
};
const initialState = {
    iAmAdult: false,
    loaded: false,
    maintenance: { ...defaultMaintenance },
    accessAvailable: true,
    game: null,
    oldGame: false,
    data: {
        totalPlayerCount: 0,
        totalBalances: '0',
        min_bet: 10,
        decimal_place: 0,
        max_payout: 10000,
    },
    savedToast: [],
    showStatistics: false,
};

export default function info(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true,
            };
        case LOAD_SUCCESS: {
            const newData = {
                ...state.data,
                ...action.result.data,
                ...action.result?.data?.time,
            };

            const interval = action.result?.timestamp * (action.timestampWithMilliSecond ? 1 : 1000) - Date.now();
            // eslint-disable-next-line camelcase
            const endTime = newData?.end_time;
            if (endTime) {
                newData.end_time = new Date(new Date(endTime) - interval).toISOString();
            }
            // eslint-disable-next-line camelcase
            const noMoreBets = newData?.no_more_bets;
            if (noMoreBets) {
                newData.no_more_bets = new Date(new Date(noMoreBets) - interval).toISOString();
            }

            let totalPlayerCount = 0;
            let totalBalances = new BigNumber(0);
            ['turtles', 'ladders', 'flags', 'dice'].forEach(game => {
                if (!newData[game]) {
                    return;
                }
                newData[game].forEach(data => {
                    try {
                        data.cashAddress = toCashAddress(data.address);
                    } catch {
                        data.cashAddress = data.address;
                    }
                    totalPlayerCount += data.player_count;
                    totalBalances = totalBalances.plus(data.total_balance);

                    if (data.winning_rate) {
                        data.winning_rate = new BigNumber(data.winning_rate).toFixed();
                    }
                });
            });
            Object.assign(newData, {
                totalPlayerCount,
                totalBalances: totalBalances.toFixed(),
            });

            // // TODO 지워라.
            // newData.areas.forEach(area => {
            //   area.min_balance = 0.05;
            // });

            return {
                ...state,
                loading: false,
                loaded: true,
                data: newData,
            };
        }
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
            };
        case GET_ACCESS_AVAILABLE_FAIL:
            return {
                ...state,
                ...(action?.error?.status === 403 && { accessAvailable: false }),
            };

        case SAVE_TOAST:
            return {
                ...state,
                savedToast: [...state.savedToast, action.data],
            };

        case CLEAR_SAVED_TOAST:
            return {
                ...state,
                savedToast: [],
            };

        case SET_SHOW_STATISTICS:
            return {
                ...state,
                showStatistics: action.state,
            };

        default:
            return state;
    }
}

export function isLoaded(globalState) {
    return globalState.info && globalState.info.loaded;
}

export function load() {
    return (dispatch, getState) => {
        const state = getState();
        return dispatch({
            types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
            promise: ({ client }) => client.get(`/${state.info.game}/game/info`, {
                params: {
                    // asset: config.asset,
                },
            }),
        });
    };
}

export function getAccessAvailable() {
    return {
        types: [GET_ACCESS_AVAILABLE, GET_ACCESS_AVAILABLE_SUCCESS, GET_ACCESS_AVAILABLE_FAIL],
        promise: ({ client }) => client.get('/v1/ping'),
    };
}

export function saveToast(data) {
    return {
        type: SAVE_TOAST,
        data,
    };
}

export function clearSavedToast() {
    return {
        type: CLEAR_SAVED_TOAST,
    };
}

export function setShowStatistics(state) {
    return {
        type: SET_SHOW_STATISTICS,
        state,
    };
}
