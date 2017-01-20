import React, { Component } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { getAutocomplete, fetchSearchResults, fetchSearchResultsSuccess,
         fetchSearchResultsFailure, setActiveSong } from '../actions/songs'
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
    songsList: state.songs.songsList,
    activeSong: state.songs.activeSong
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
        if (!response.error) {
          dispatch(setActiveSong(response.payload.data.youtubeResults[0]))
          dispatch(fetchSearchResultsSuccess(response.payload))
        } else {
          dispatch(fetchSearchResultsFailure(response.payload))
        }
      })
    }

  }
}

class HeaderContainer extends Component {

  componentWillMount () {
    this.state = {
      searchQuery : '',
      inputFocus : false
    }
  }
/*
  componentWillUpdate (props, state) {
    if (props.searchList !== undefined) {
      if (props.searchList.loading !== true) {
        this.props.onSearch(props.searchList)
      }
    }
  } */

  handleBlur = (e) => {
    this.setState({ inputFocus : false, searchButtonIcon: 'search' })
  }

  handleFocus = (e) => {
    this.setState({ inputFocus : true, searchButtonIcon: 'close' })
    console.log('wwwwww')
  }

  handleChange = (e) => {
    let isOptionSelected = false

    this.props.autocompleteList.map((q) => {
      if (q === e.target.value) {
        isOptionSelected = true
      }
    })

    if (isOptionSelected === false) this.props.getAutocomplete(e.target.value)

    this.setState({
      searchQuery: e.target.value
    })
  }

  handleClickSearch = (e) => {
    this.props.searchSongs(this.state.searchQuery)
     // this.refs.inputSearch.blur()
  }

  render () {
    return (
      <Header onBlur={this.handleBlur} onFocus={this.handleFocus}
        onChange={this.handleChange} searchQuery={this.state.searchQuery}
        inputFocus={this.state.inputFocus} onSearch={this.handleClickSearch}
        autocompleteList={this.props.autocompleteList}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
