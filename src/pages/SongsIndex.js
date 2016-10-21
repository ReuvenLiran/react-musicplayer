import React, { Component } from 'react';
// import HeaderContainer from '../containers/HeaderContainer.js';
// import ValidateEmailAlertContainer from '../containers/ValidateEmailAlertContainer.js';
import SongsList from '../containers/SongsListContainer.js';

class SongsIndex extends Component {
  render() {
    return (
      <div>
        { /* <HeaderContainer type="songs_index"/> */ }
        { /* <ValidateEmailAlertContainer/> */ }
        <SongsList />
      </div>
    );
  }
}


export default SongsIndex;
