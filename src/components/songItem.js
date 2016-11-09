import React, { Component } from 'react';  

     const listStyle = { 
      width: '60%', 
      float:'left',
      backgroundColor: 'yellow',
      };
      
    const playerStyle = { 
      float:'right',
      backgroundColor: '#222222',
      };
    const durationStyle = {
           width: '5%',
          //display: 'inline-block',
          float:'right',
          marginLeft:'2%',
          marginRight:'2%',
    }
    const artistStyle = {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textAlign: 'left',
        width: '90%', 
        float:'left',
     }
    var listItemStyle = {
      marginBottom: '2%',
      width: '100%',
      listStyleType:'none',
      backgroundColor: '#222222',
      display: 'inline-block',
    }

    const trackNameStyle = {
     }

//==========================================

class SongItem extends Component {

  constructor(props) {
    super(props);
  } 

 handleClick(song){
    this.props.setActiveSong(song);
  }
 
 secondsToMinutes(s) {
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}

alignArtists(artists) {
  var strArtists = "";
  artists.map((artist) => {
    strArtists = strArtists.concat(artist).concat(", ");
  });

  return  strArtists.slice(0, strArtists.length-2);
}

  render() {

    const { song, activeSong } = this.props; 
     
    if(song._id == activeSong._id){
       listItemStyle.backgroundColor =  '#3A3A3A';  
    } else {
      listItemStyle.backgroundColor = '#222222';
    }

    return (
      <li style={listItemStyle}  onClick={() => { this.handleClick(song) }} className="btn btn-primary btn-lg" key={song.file}>
            <h3 style={trackNameStyle} className="list-group-item-heading">{song.track_name}</h3>
            <div align="left" style={artistStyle}>{this.alignArtists(song.artists)} </div>
            <div style={durationStyle}>{this.secondsToMinutes(song.track_length)} </div>
          </li>
    );
  }
} 
export default SongItem;
