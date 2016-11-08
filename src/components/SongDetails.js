import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SongDetails extends Component {
  /*static contextTypes = {
    router: PropTypes.object
  };*/

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    // this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchPost(this.props.songId);
  }


  render() {
    const { song, loading, error } = this.props.activeSong;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!song) {
      return <span />
    }

    return (
      <div className="container">
        <h3>{song.title}</h3>
        <p>{song.content}</p>
      </div>
    );
  }
}

export default SongDetails;
