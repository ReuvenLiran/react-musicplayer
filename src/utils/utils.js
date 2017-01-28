export default class Utils {

  static alignArtists (artists) {
    if (artists.constructor !== Array) {
      return artists
    }
    var strArtists = ''
    if (artists !== undefined) {
      artists.map((artist) => {
        strArtists = strArtists.concat(artist).concat(', ')
      })
    }
    return strArtists.slice(0, strArtists.length - 2)
  }

  static secondsToMinutes (s) {
    var m = Math.floor(s / 60) // Get remaining minutes
    s -= m * 60
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) // zero padding on minutes and seconds
  }
}
