const SET_TRACK = 'game/audio/SET_TRACK';
const SET_MUTE = 'game/audio/SET_MUTE';

export const TRACK = {
    _WAIT: 'bgm-1.mp3',
    _MOVE: 'racing-1.mp3',
};

const initialState = {
    track: null,
    mute: {},
};

Object.values(TRACK).forEach(track => {
    initialState.mute[track] = false;
});

export default function audio(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TRACK:
            return {
                ...state,
                track: action.track,
            };

        case SET_MUTE:
            return {
                ...state,
                mute: {
                    ...state.mute,
                    ...action.mute,
                },
            };

        default:
            return state;
    }
}

export function setTrack(track) {
    return {
        type: SET_TRACK,
        track,
    };
}

export function setMute(mute) {
    return {
        type: SET_MUTE,
        mute,
    };
}
