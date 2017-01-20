import { connect } from 'react-redux'
import { fetchSongs, fetchSongsSuccess, setActiveSong } from '../actions/songs'

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
      dispatch(fetchSongs()).then((response) => {
        dispatch(setActiveSong(response.payload.data[0]))
        dispatch(fetchSongsSuccess(response.payload))
      })
    }
  }
}

const SongsIndexContainer = connect(mapStateToProps, mapDispatchToProps)(SongsIndex)

export default SongsIndexContainer
