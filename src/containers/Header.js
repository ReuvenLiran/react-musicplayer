// import React, { ReactDOM, Component } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { getAutocomplete, fetchSearchResults, fetchSearchResultsSuccess,
         fetchSearchResultsFailure } from '../actions/songs'
/*
class HeaderContainer extends Component {

  componentDidMount () {
    $(ReactDOM.findDOMNode(this.refs.searchInput)).autocomplete({
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': 'http://placehold.it/250x250'
      }
    })
  }

  render () {
    <Header />
  }

} */

const mapStateToProps = (state) => {
  return {
    autocompleteList: state.songs.autocompleteList,
    songsList: state.songs.songsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAutocomplete: (q) => {
      dispatch(getAutocomplete(q)).then((response) => {
      })
    },

    searchSongs: (q) => {
      dispatch(fetchSearchResults(q)).then((response) => {
        !response.error
        ? dispatch(fetchSearchResultsSuccess(response.payload))
        : dispatch(fetchSearchResultsFailure(response.payload))
      })
    }

  }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
