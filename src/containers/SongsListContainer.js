import { connect } from 'react-redux'
import { fetchSongs, fetchSongsSuccess, fetchSongsFailure, setActiveSong } from '../actions/songs';

import SongsList from '../components/SongsList';


const mapStateToProps = (state) => {
  return { 
    songsList: state.songs.songsList,
    activeSong: state.songs.activeSong
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => {
      dispatch(fetchSongs()).then((response) => {
           // !response.error ? dispatch(fetchSongsSuccess(response.payload)) : dispatch(fetchSongsFailure(response.payload));
           dispatch(fetchSongsSuccess(response.payload));
          // alert(response.payload);
           console.log(response.payload.data[0]);

           dispatch(setActiveSong(response.payload.data[0]));

         });
    }
  }
}


const SongsListContainer = connect(mapStateToProps, mapDispatchToProps)(SongsList)

export default SongsListContainer
