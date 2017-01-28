import axios from 'axios'
import * as constants from '../utils/constants'

// Songs list
export const FETCH_SONGS = 'FETCH_SONGS'
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS'
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE'
export const RESET_SONGS = 'RESET_SONGS'

// Active Song
export const ACTIVE_SONG = 'ACTIVE_SONG'
export const AUTOCOMPLETE = 'AUTOCOMPLETE'

export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS'
export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS'
export const FETCH_SEARCH_RESULTS_FAILURE = 'FETCH_SEARCH_RESULTS_FAILURE'

export const LOAD_YOUTUBE_API = 'LOAD_YOUTUBE_API'
export const LOAD_YOUTUBE_API_SUCCESS = 'LOAD_YOUTUBE_API_SUCCESS'

export function fetchSongs () {
  const request = axios({
    method: 'get',
    url: `${constants.ROOT_URL_API}/getTopPopularSongs`,
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

export function getAutocomplete (query) {
  const request = axios({
    method: 'get',
    params: { q: query },
    url: `${constants.ROOT_URL_API}/autocomplete`,
    headers: []
  })

  return {
    type: AUTOCOMPLETE,
    payload: request
  }
}

export function fetchSearchResults (query) {
  const request = axios({
    method: 'get',
    params: { q: query },
    url: `${constants.ROOT_URL_API}/search`,
    headers: []
  })

  return {
    type: FETCH_SEARCH_RESULTS,
    payload: request
  }
}

export function fetchSearchResultsSuccess (results) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    payload: results
  }
}

export function fetchSearchResultsFailure (error) {
  return {
    type: FETCH_SEARCH_RESULTS_FAILURE,
    payload: error
  }
}

export function loadYoutubeAPI () {
  const loadYT = new Promise((resolve) => {
    console.log('loadYT Loading...')
    const tag = document.createElement('script')
    tag.src = constants.YOUTUBE_CONSTS.API_URL
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = () => { resolve(window.YT); console.log('YT') }
  })
  return {
    type: LOAD_YOUTUBE_API,
    payload: loadYT
  }
}

export function loadYoutubeAPISuccess (loadYT) {
  loadYT.then({
    function (v) {
      return {
        type: LOAD_YOUTUBE_API_SUCCESS,
        payload: loadYT
      }
    }
  })
}
