import React, { Component } from 'react';
import { Link } from 'react-router';

class SongsList extends Component {
  componentWillMount() {
    this.props.fetchSongs();
  }
 
  renderSongs(songs) {
    return songs.map((song) => {
      return (
        <li className="list-group-item" key={song._id}>
          <Link style={{color:'black'}} to={"songs/" + song._id}>
            <h3 className="list-group-item-heading">{song.title}</h3>
          </Link>
        </li>
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
        <ul className="list-group">
          {this.renderSongs(songs)}
        </ul>
      </div>
    );
  }
}
 
export default SongsList;
