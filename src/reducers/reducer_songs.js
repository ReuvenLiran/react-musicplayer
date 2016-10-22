import {
	FETCH_SONGS, FETCH_SONGS_SUCCESS, FETCH_SONGS_FAILURE, RESET_SONGS,
	FETCH_SONG, FETCH_SONG_SUCCESS,  FETCH_SONG_FAILURE, RESET_ACTIVE_SONG,
	CREATE_SONG, CREATE_SONG_SUCCESS, CREATE_SONG_FAILURE, RESET_NEW_SONG,
	DELETE_SONG, DELETE_SONG_SUCCESS, DELETE_SONG_FAILURE, RESET_DELETED_SONG,
  VALIDATE_SONG_FIELDS,VALIDATE_SONG_FIELDS_SUCCESS, VALIDATE_SONG_FIELDS_FAILURE, RESET_SONG_FIELDS
} from '../actions/songs';


	const INITIAL_STATE = { songsList: {songs: [], error:null, loading: false},  
							newSong:{song:null, error: null, loading: false}, 
							activeSong:{song:null, error:null, loading: false}, 
							deletedSong: {song: null, error:null, loading: false},
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
   
  case FETCH_SONGS: // start fetching songs and set loading = true
  	return { ...state, songsList: {songs:[], error: null, loading: true} }; 
  case FETCH_SONGS_SUCCESS: // return list of songs and make loading = false
    return { ...state, songsList: {songs: action.payload.data, error:null, loading: false} };
  case FETCH_SONGS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, songsList: {songs: [], error: error, loading: false} };
  case RESET_SONGS:// reset songList to initial state
    return { ...state, songsList: {songs: [], error:null, loading: false} };

  case FETCH_SONG:
    return { ...state, activeSong:{...state.activeSong, loading: true}};
  case FETCH_SONG_SUCCESS:
    return { ...state, activeSong: {song: action.payload.data, error:null, loading: false}};
  case FETCH_SONG_FAILURE:
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activeSong: {song: null, error:error, loading:false}};
  case RESET_ACTIVE_SONG:
    return { ...state, activeSong: {song: null, error:null, loading: false}};

  case CREATE_SONG:
  	return {...state, newSong: {...state.newSONG, loading: true}}
  case CREATE_SONG_SUCCESS:
  	return {...state, newSong: {song:action.payload.data, error:null, loading: false}}
  case CREATE_SONG_FAILURE:
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, newSong: {song:null, error:error, loading: false}}
  case RESET_NEW_SONG:
  	return {...state,  newSong:{song:null, error:null, loading: false}}


  case DELETE_SONG:
   	return {...state, deletedSong: {...state.deletedSong, loading: true}}
  case DELETE_SONG_SUCCESS:
  	return {...state, deletedSong: {song:action.payload.data, error:null, loading: false}}
  case DELETE_SONG_FAILURE:
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, deletedSong: {song:null, error:error, loading: false}}
  case RESET_DELETED_SONG:
  	return {...state,  deletedSong:{song:null, error:null, loading: false}}

  case VALIDATE_SONG_FIELDS:
    return {...state, newSong:{...state.newSong, error: null, loading: true}}
  case VALIDATE_SONG_FIELDS_SUCCESS:
    return {...state, newSong:{...state.newSong, error: null, loading: false}}
  case VALIDATE_SONG_FIELDS_FAILURE:
    let result = action.payload.data;
    if(!result) {
      error = {message: action.payload.message};
    } else {
      error = {title: result.title, categories: result.categories, description: result.description};
    }
    return {...state, newSong:{...state.newSong, error: error, loading: false}}
  case RESET_SONG_FIELDS:
    return {...state, newSong:{...state.newSong, error: null, loading: null}}
  default:
    return state;
  }
}
