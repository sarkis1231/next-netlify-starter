import BigNumber from 'bignumber.js';
import _last from 'lodash/last';
// import config from 'config';

const LOAD = 'game/player/LOAD';
const LOAD_SUCCESS = 'game/player/LOAD_SUCCESS';
const LOAD_FAIL = 'game/player/LOAD_FAIL';

const LOAD_DATA = 'game/player/LOAD_DATA';
const LOAD_DATA_SUCCESS = 'game/player/LOAD_DATA_SUCCESS';
const LOAD_DATA_FAIL = 'game/player/LOAD_DATA_FAIL';

const ADD_DATA = 'game/player/ADD_DATA';

const LOAD_LAST = 'game/player/LOAD_LAST';
const LOAD_LAST_SUCCESS = 'game/player/LOAD_LAST_SUCCESS';
const LOAD_LAST_FAIL = 'game/player/LOAD_LAST_FAIL';

const SEARCH = 'game/player/SEARCH';
const SEARCH_SUCCESS = 'game/player/SEARCH_SUCCESS';
const SEARCH_FAIL = 'game/player/SEARCH_FAIL';

const CLEAR = 'game/player/clear';
const CONFIRM = 'bitto/player/PARTICIPATE_CONFIRM';

const initialState = {
    loaded: false,
    bettingAvailable: {},
    myBetting: {},
    data: [],
    search: {
        loaded: false,
        hasMore: true,
        data: {},
    },
};

function getBettingAvailable(amount, myBetting, areas, precision = 2) {
    const limit = {};

    areas.forEach(
        ({
             area,
             max_diff_amount, // eslint-disable-line camelcase
             payout_rate, // eslint-disable-line camelcase
             min_balance, // eslint-disable-line camelcase
             max_balance, // eslint-disable-line camelcase
         }) => {
            // eslint-disable-next-line camelcase
            const payoutRate = Array.isArray(payout_rate) ? Math.max(...payout_rate) : payout_rate;
            limit[area] = BigNumber.min(
                BigNumber.min(
                    BigNumber.max(
                        new BigNumber(max_diff_amount)
                            .plus(amount.total)
                            .minus(new BigNumber(payoutRate).multipliedBy(amount[area]))
                            .dividedBy(new BigNumber(payoutRate).minus(1))
                            .toFixed(precision, 1),
                        min_balance
                    ),
                    max_balance
                ),
                new BigNumber(max_balance).minus(myBetting[area])
            ).toFixed();
        }
    );

    return limit;
}

export default function player(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
        case LOAD_LAST:
            return {
                ...state,
                [action.color]: {
                    ...state[action.color],
                    loading: true,
                },
            };
        case LOAD_FAIL:
        case LOAD_LAST_FAIL:
            return {
                ...state,
                [action.color]: {
                    ...state[action.color],
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
            };
        case LOAD_SUCCESS: {
            const newData = [...state[action.color].data];
            const loaded = [...(Array.isArray(action?.result?.data) ? action.result.data : action?.result?.data?.players)];
            const hasMore = loaded.length > 0;

            loaded.forEach(data => {
                if (!data.id && data.player_id) {
                    data.id = data.player_id;
                }
            });

            if (hasMore) {
                const loadedFirstPlayerId = loaded?.[0]?.id;
                const beforeLastPlayerId = _last(state[action.color].data)?.id || loadedFirstPlayerId + 1;

                if (loadedFirstPlayerId >= beforeLastPlayerId) {
                    do {
                        loaded.splice(0, 1);
                    } while (loaded.length > 0 && loaded[0].id >= beforeLastPlayerId);
                }
                newData.push(...loaded);
            }

            return {
                ...state,
                [action.color]: {
                    ...state[action.color],
                    loading: false,
                    loaded: true,
                    hasMore,
                    data: newData,
                },
            };
        }
        case LOAD_LAST_SUCCESS: {
            const newData = [...state[action.color].data];
            const loaded = [...(Array.isArray(action?.result?.data) ? action.result.data : action?.result?.data?.players)];

            loaded.forEach(data => {
                if (!data.id && data.player_id) {
                    data.id = data.player_id;
                }
            });

            if (loaded.length > 0) {
                const loadedLastPlayerId = _last(loaded)?.id;
                const beforeFirstPlayerId = state[action.color].data?.[0]?.id || loadedLastPlayerId - 1;

                if (loadedLastPlayerId <= beforeFirstPlayerId) {
                    for (let index = loaded.length - 1; index >= 0; index -= 1) {
                        if (loaded[index].id > beforeFirstPlayerId) {
                            break;
                        }
                        loaded.splice(index);
                    }
                }
                newData.unshift(...loaded);
            }

            return {
                ...state,
                [action.color]: {
                    ...state[action.color],
                    loaded: true,
                    loading: false,
                    data: newData,
                },
            };
        }
        case CONFIRM: {
            const data = [...state?.all?.data];

            for (let i = 0; i < data.length; i += 1) {
                if (data[i].txid === action.txid) {
                    if (data[i].confirm_count === 0) {
                        data[i].confirm_count = 1;
                    }
                    break;
                }
            }

            return {
                ...state,
                all: {
                    ...state.all,
                    data,
                },
            };
        }
        case CLEAR:
            return {
                ...initialState,
            };
        case SEARCH:
            return {
                ...state,
                search: {
                    ...state.search,
                    loading: true,
                },
            };
        case SEARCH_FAIL:
            return {
                ...state,
                search: {
                    ...state.search,
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                search: {
                    ...state.search,
                    loading: false,
                    loaded: true,
                    data: action.result.data,
                },
            };

        case LOAD_DATA_SUCCESS: {
            const players = action.result?.data?.players;
            const amount = {
                total: new BigNumber(0),
            };
            const myBetting = {};

            players.forEach(data => {
                amount[data.area] = amount[data.area].plus(data.amount);
                if (data.user_hash === action.moneyButtonUserIdHash) {
                    myBetting[data.area] = myBetting[data.area].plus(data.amount);
                }
            });
            Object.keys(amount).forEach(key => {
                amount[key] = amount[key].toFixed();
            });
            Object.keys(myBetting).forEach(key => {
                myBetting[key] = myBetting[key].toFixed();
            });

            return {
                ...state,
                loaded: true,
                ...(Array.isArray(players) && {
                    amount,
                    myBetting,
                    bettingAvailable: getBettingAvailable(amount, myBetting, action.areas, action.precision),
                    data: [...players],
                }),
                // data: [
                //   {
                //     txid: '86b0fb0cfa117b6cbfebae752401c780899a0a1b80cd92a2b95324d448e47136',
                //     user_hash: '',
                //     area: 'P',
                //     amount: 0.001,
                //   },
                // ],
            };
        }

        case ADD_DATA: {
            const amount = {
                ...state.amount,
                [action.data.area]: new BigNumber(state.amount[action.data.area]).plus(action.data.amount).toFixed(),
                total: new BigNumber(state.amount.total).plus(action.data.amount).toFixed(),
            };

            const myBetting = { ...state.myBetting };
            if (action.data.user_hash === action.moneyButtonUserIdHash) {
                // myBetting = {
                //   ...state.myBetting,
                //   [action.data.area]: new BigNumber(state.myBetting[action.data.area]).plus(action.data.amount).toFixed(),
                // };
                myBetting[action.data.area] = new BigNumber(state.myBetting[action.data.area])
                    .plus(action.data.amount)
                    .toFixed();
            }

            return {
                ...state,
                amount,
                myBetting,
                bettingAvailable: getBettingAvailable(amount, myBetting, action.areas, action.precision),
                data: [{ ...action.data }, ...state.data],
            };
        }

        default:
            return state;
    }
}

export function clear() {
    return {
        type: CLEAR,
    };
}

export function isLoaded(globalState) {
    return globalState.info && globalState.info.loaded;
}

function makeLoad({
                      color, types, page = 0, size = 50,
                  } = {}) {
    return (dispatch, getState) => {
        const state = getState();
        const { game } = state.info;
        const params = {
            // asset: config.asset,
            page,
            size,
        };

        if (color !== 'all') {
            const key = 'color';
            switch (game) {
                case 'ladder':
                default:
                    break;
            }
            Object.assign(params, { [key]: color });
        }

        return dispatch({
            types,
            promise: ({ client }) => client.get(`/${game}/game/player_list`, {
                params,
            }),
            color,
        });
    };
}

export function load(args = {}) {
    return makeLoad({ ...args, types: [LOAD, LOAD_SUCCESS, LOAD_FAIL] });
}

export function loadData(gameId) {
    return (dispatch, getState) => {
        const state = getState();
        return dispatch({
            types: [LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_FAIL],
            promise: ({ client }) => client.get(`/v1/${state.info.game}/games/current/bets`, {
                params: {
                    // asset: config.asset,
                    // eslint-disable-next-line camelcase
                    game_id: gameId || state.info.data?.game_id,
                },
            }),
            color: 'all',
            areas: state.info.data?.areas,
            moneyButtonUserIdHash: state.auth.moneyButtonUserIdHash || state.auth.user?.moneyButtonUserIdHash,
            // eslint-disable-next-line camelcase
            precision: state.info.data?.decimal_place,
        });
    };
}

export function loadLast(args = {}) {
    return makeLoad({
        page: 0,
        size: 10,
        ...args,
        types: [LOAD_LAST, LOAD_LAST_SUCCESS, LOAD_LAST_FAIL],
    });
}

export function bittoParticipateConfirm(txid) {
    return {
        type: CONFIRM,
        txid,
    };
}

export function search({ q }) {
    return (dispatch, getState) => {
        const state = getState();
        return dispatch({
            types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
            promise: ({ client }) => client.get(`/${state.info.game}/search/current`, {
                params: {
                    // asset: config.asset,
                    q,
                },
            }),
        });
    };
}

export function addData(data) {
    return (dispatch, getState) => {
        const state = getState();
        return dispatch({
            type: ADD_DATA,
            data,
            areas: state.info.data?.areas,
            moneyButtonUserIdHash: state.auth.moneyButtonUserIdHash || state.auth.user?.moneyButtonUserIdHash,
            // eslint-disable-next-line camelcase
            precision: state.info.data?.decimal_place,
        });
    };
}
