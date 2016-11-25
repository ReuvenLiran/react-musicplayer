import axios from 'axios'

// Songs list
export const FETCH_SONGS = 'FETCH_SONGS'
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS'
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE'
export const RESET_SONGS = 'RESET_SONGS'

// Active Song
export const ACTIVE_SONG = 'ACTIVE_SONG'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api'
export function fetchSongs () {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/songs`,
    headers: []
  })

  return {
    type: FETCH_SONGS,
    payload: request
  }
}

export function fetchSongsSuccess (songs) {
  return {
    type: FETCH_SONGS_SUCCESS,
    payload: songs
  }
}

export function fetchSongsFailure (error) {
  return {
    type: FETCH_SONGS_FAILURE,
    payload: error
  }
}

export function setActiveSong (activeSong) {
  return {
    type: ACTIVE_SONG,
    payload: activeSong
  }
}
