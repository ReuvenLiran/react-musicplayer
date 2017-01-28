import { connect } from 'react-redux'
import { fetchSongs, fetchSongsSuccess, setActiveSong,
         loadYoutubeAPI } from '../actions/songs'

import SongsIndex from '../components/SongsIndex'

const mapStateToProps = (state) => {
  return {
    songsList: state.songs.songsList,
    activeSong: state.songs.activeSong
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => {
      dispatch(loadYoutubeAPI()).then((response) => {
        Promise.resolve(response.payload).then(function (value) {
          dispatch(fetchSongs()).then((response) => {
            dispatch(setActiveSong(response.payload.data.youtubeResults[0]))
            dispatch(fetchSongsSuccess(response.payload))
          })
        })
      })
    }
  }
}

const SongsIndexContainer = connect(mapStateToProps, mapDispatchToProps)(SongsIndex)

export default SongsIndexContainer
