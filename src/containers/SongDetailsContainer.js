import SongDetails from '../components/SongDetails.js';
import { fetchSong, fetchSongSuccess, fetchSongFailure, resetActiveSong, resetDeletedSong } from '../actions/Songs';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return { activeSong: globalState.songs.activeSong, songId: ownProps.id };
}

const mapDispatchToProps = (dispatch) => {
  return {
  	 fetchSong: (id) => {
    	dispatch(fetchSong(id))
      	.then((data) => 
          {
          	!data.error ? dispatch(fetchSongSuccess(data.payload)) : dispatch(fetchSongFailure(data.payload));
          }) 
  	 },
     resetMe: () =>{
      //clean up both activeSong(currrently open) and deletedSong(open and being deleted) states
        dispatch(resetActiveSong());
        dispatch(resetDeletedSong());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongDetails);
