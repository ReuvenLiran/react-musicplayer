import React, { Component } from 'react';
import { Link } from 'react-router';
import SongItem  from '../containers/SongItemContainer';
import ReactMusicPlayer from '../react-music-player/ReactMusicPlayerContainer';
// import SplitPane from 'react-split-pane';

     const listStyle = {
      //color: 'blue',
      width: '60%',
      //position: 'absolute',
      float:'left',
      backgroundColor: 'yellow',
      };
      
    const playerStyle = {
     // color: 'blue',
      //width: '60%',
      //position: 'absolute',
      float:'right',
      //backgroundColor: 'yellow',
      };
    const durationStyle = {
          float:'right',
          marginRigth:'20px',
    }
    const artistStyle = {
          float:'left',
     }
    const listItemStyle = {
      width: '100%',
      listStyleType:'none',
      //backgroundColor: 'yellow',
      display: 'inline-block',
    }

    const trackNameStyle = {
     }

//==========================================

class SongsList extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      selectedItem: null
    };
   }

  componentWillMount() {
    this.props.fetchSongs();
    //this.handleClick = this.handleClick.bind(this);
  }
/*
 handleClick(song){
    this.setState({selectedItem: idx});
    //alert(song.track_name);
    this.props.setActiveSong(song)
    //this.renderPlayer(songs, song);
  }*/
 
 secondsToMinutes(s) {
    //var h = Math.floor(s/3600); //Get whole hours
    //s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}

 renderPlayer(songs, song) {
   
   var empty;
   let entries = songs.entries( );
   for (let entry of entries) {
    console.log("SONGS" + entry);
    empty = entry;
   }
/*
   if (song.length == 0) {
     song = songs[0];
   }
  */  
    if(empty) {

    //alert(song.track_name);
      return ( <ReactMusicPlayer songs={songs} song={song} /> );
    } else {
      return <div className="container"><h1>Songs</h1><h3>Loading...</h3></div>      
    }
  //   <Link style={{color:'black'}} to={"songs/" + song.file}>

 }

     
 renderSongs(songs) {
    return songs.map((song) => {
        return (
          <SongItem song={song} />
          /*
          <li style={listItemStyle}  onClick={() => { this.handleClick(songs, song) }} className="btn btn-primary btn-lg" key={song.file}>
            <h3 style={trackNameStyle} className="list-group-item-heading">{song.track_name}</h3>
            <span style={artistStyle}>{song.artist_name} </span>
            <span style={durationStyle}>{this.secondsToMinutes(song.track_length)} </span>
          </li>*/

      );
    });
  }

  render() {
    const { songs, loading, error } = this.props.songsList; 
    
    if(loading) {
      return <div className="container"><h1>Songs</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }
 
    return (
      <div className="container">
        <h1>Songs</h1>
        <ul className="list-group" style={listStyle}>
        {this.renderSongs(songs)}
        </ul>
        
        <div style={playerStyle}>
        {this.renderPlayer(songs, songs[0])}
        </div>

      </div>
    );
  }
}
 
export default SongsList;
