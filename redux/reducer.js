import info from './modules/info';
import player from './modules/player';
import audio from './modules/audio';
import { combineReducers } from 'redux';


export default combineReducers({
  info,
  player,
  audio,
})
