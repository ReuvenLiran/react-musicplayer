import axios from 'axios';

//SONG list
export const FETCH_SONGS = 'FETCH_SONGS';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';
export const RESET_SONGS = 'RESET_SONGS';

//Create new SONG
export const CREATE_SONG = 'CREATE_SONG';
export const CREATE_SONG_SUCCESS = 'CREATE_SONG_SUCCESS';
export const CREATE_SONG_FAILURE = 'CREATE_SONG_FAILURE';
export const RESET_NEW_SONG = 'RESET_NEW_SONG';

//Validate SONG fields like Title, Categries on the server
export const VALIDATE_SONG_FIELDS = 'VALIDATE_SONG_FIELDS';
export const VALIDATE_SONG_FIELDS_SUCCESS = 'VALIDATE_SONG_FIELDS_SUCCESS';
export const VALIDATE_SONG_FIELDS_FAILURE = 'VALIDATE_SONG_FIELDS_FAILURE';
export const RESET_SONG_FIELDS = 'RESET_SONG_FIELDS';

//Fetch SONG
export const FETCH_SONG = 'FETCH_SONG';
export const FETCH_SONG_SUCCESS = 'FETCH_SONG_SUCCESS';
export const FETCH_SONG_FAILURE = 'FETCH_SONG_FAILURE';
export const RESET_ACTIVE_SONG = 'RESET_ACTIVE_SONG';

//Delete SONG
export const DELETE_SONG = 'DELETE_SONG';
export const DELETE_SONG_SUCCESS = 'DELETE_SONG_SUCCESS';
export const DELETE_SONG_FAILURE = 'DELETE_SONG_FAILURE';
export const RESET_DELETED_SONG = 'RESET_DELETED_SONG';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
export function fetchSongs() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/songs`,
    headers: []
  });

  return {
    type: FETCH_SONGS,
    payload: request
  };
}

export function fetchSongsSuccess(songs) {
  return {
    type: FETCH_SONGS_SUCCESS,
    payload: songs
  };
}

export function fetchSongsFailure(error) {
  return {
    type: FETCH_SONGS_FAILURE,
    payload: error
  };
}
/*
export function validateSONGFields(props) {
  //note: we cant have /SONGs/validateFields because it'll match /SONGs/:id path!
  const request = axios.SONG(`${ROOT_URL}/SONGs/validate/fields`, props);

  return {
    type: VALIDATE_SONG_FIELDS,
    payload: request
  };
}

export function validateSONGFieldsSuccess() {
  return {
    type: VALIDATE_SONG_FIELDS_SUCCESS
  };
}

export function validateSONGFieldsFailure(error) {
  return {
    type: VALIDATE_SONG_FIELDS_FAILURE,
    payload: error
  };
}

export function resetSONGFields() {
  return {
    type: RESET_SONG_FIELDS
  }
};
*/

export function createSongs(props, tokenFromStorage) { 
  const request = axios({
    method: 'SONG',
    data: props,
    url: `${ROOT_URL}/songs`,
   headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: CREATE_SONG,
    payload: request
  };
}

export function createSongSuccess(newSong) {
  return {
    type: CREATE_SONG_SUCCESS,
    payload: newSong
  };
}

export function createSongFailure(error) {
  return {
    type: CREATE_SONG_FAILURE,
    payload: error
  };
}

export function resetNewSong() {
  return {
    type: RESET_NEW_SONG
  }
};

export function resetDeletedSong() {
  return {
    type: RESET_DELETED_SONG
  }
};

export function setActiveSong(activeSong) {

  return {
    type: ACTIVE_SONG,
    payload: activeSong
  };
}


export function fetchSongSuccess(activeSong) {
  return {
    type: FETCH_SONG_SUCCESS,
    payload: activeSong
  };
}

export function fetchSongFailure(error) {
  return {
    type: FETCH_SONG_FAILURE,
    payload: error
  };
}

export function resetActiveSong() {
  return {
    type: RESET_ACTIVE_SONG
  }
};

export function deleteSong(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/songs/${id}`,
   headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });
  return {
    type: DELETE_SONG,
    payload: request
  };
}

export function deleteSongSuccess(deletedSong) {
  return {
    type: DELETE_SONG_SUCCESS,
    payload: deletedSong
  };
}

export function deleteSongFailure(response) {
  return {
    type: DELETE_SONG_FAILURE,
    payload: response
  };
}