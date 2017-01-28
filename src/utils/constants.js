const PORT = '6882'
const ROOT =
      location.href.indexOf('localhost') > 0 ? 'http://localhost:' : 'http://192.168.5.102:'
export const ROOT_URL = ROOT + PORT + '/'
export const ROOT_URL_API = ROOT_URL + 'api'
export const YOUTUBE_CONSTS = {
  YOUTUBE: 'Youtube',
  URL: 'http://www.youtube.com/embed/',
  API: 'enablejsapi=1',
  AUTOPLAY: 'autoplay=1',
  API_URL: 'http://www.youtube.com/iframe_api'
}

export const DOWNLOAD_YOUTUBE = '//www.youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v='
export const BASE_COLOR1 = '#192d50'
export const HEADER_FONT_COLOR = '#dfceba'
export const BASE_COLOR2 = '#dfceba'
export const BASE_COLOR3 = '#f7f6f7'
export const TABLE_HEADER_FONT_COLOR = '#4f6073'
export const TABLE_FONT_COLOR = '#030b15'
export const googleAutoSuggestURL =
      `//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`
