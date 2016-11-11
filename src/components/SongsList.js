import '../styles/SongList.scss';
import React, { Component } from 'react';
//import { Link } from 'react-router';
import SongItem  from '../containers/SongItemContainer';
import ReactMusicPlayer from '../containers/ReactMusicPlayerContainer';
 
class SongsList extends Component {

  constructor(props) {
    super(props); 
   }

  componentWillMount() {
    this.props.fetchSongs();
  }
  
 secondsToMinutes(s) {
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}

 renderPlayer(songs, song) {

    if(song != undefined) {
      return ( <ReactMusicPlayer songs={songs} song={song} /> );
    } else {
      return <div className="container"><h1>Songs</h1><h3>Loading...</h3></div>      
    }
 } 

 renderSongs(songs) {
    return songs.map((song) => {
        return (
          <SongItem song={song} />
      );
    });
  }

  render() {
    const { songs, loading, error } = this.props.songsList; 
    
    if(loading) {
      return <div className="container"><h1>Loading...</h1></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }
 
    return (
      <div className="container">
        
        <ul className="list-group songs-list">
        {this.renderSongs(songs)}
        </ul>
        
        <div className="player-style">
        {this.renderPlayer(songs, songs[0])}
        </div>

      </div>
    );
  }
}
 
export default SongsList;
