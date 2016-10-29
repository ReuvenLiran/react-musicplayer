import React, { Component } from 'react'; 
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
    var listItemStyle = {
      width: '100%',
      listStyleType:'none',
      //backgroundColor: 'yellow',
      display: 'inline-block',
    }

    const trackNameStyle = {
     }

//==========================================

class SongItem extends Component {

  constructor(props) {
    super(props);

    console.log('songItem');
  }

  componentWillMount() { 
    //this.handleClick = this.handleClick.bind(this);
  }

 handleClick(song){
    //alert(song.track_name);
    this.props.setActiveSong(song)
    //this.renderPlayer(songs, song);
  }
 
 secondsToMinutes(s) {
    //var h = Math.floor(s/3600); //Get whole hours
    //s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}

  render() {

    const { song, activeSong } = this.props; 
    
    console.log('songitem-activeSong', this.props.activeSong);
    console.log('songitem-song',  this.props.song);

    if(song._id == activeSong._id){
        console.log('before', listItemStyle );
        var backgroundColor = {};
        backgroundColor.backgroundColor = 'yellow';
        listItemStyle.backgroundColor =  'yellow'; 
//        listItemStyle.push( backgroundColor );
        console.log('after', listItemStyle);
    } else {
      delete listItemStyle.backgroundColor;
    }

    return (
      <li style={listItemStyle}  onClick={() => { this.handleClick(song) }} className="btn btn-primary btn-lg" key={song.file}>
            <h3 style={trackNameStyle} className="list-group-item-heading">{song.track_name}</h3>
            <span style={artistStyle}>{song.artist_name} </span>
            <span style={durationStyle}>{this.secondsToMinutes(song.track_length)} </span>
          </li>
    );
  }
}
 
export default SongItem;
