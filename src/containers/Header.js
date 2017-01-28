import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'
import axios from 'axios'
import { ROOT_URL_API } from '../utils/constants'
import { getAutocomplete, fetchSearchResults, fetchSearchResultsSuccess,
         fetchSearchResultsFailure, setActiveSong } from '../actions/songs'

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
      searchState : false,
      autocompleteList: []
    }
  }

  handleBlur = (e) => {
    e.preventDefault()
  }

  handleFocus = (e) => {
    this.setState({ searchState : 'open', searchButtonIcon: 'close' })
  }

  handleChange = (e) => {
    let q = e.target.value
    if (q === '') {
      this.setState({ searchQuery: q })
    } else {
      this.getAutocomplete(q).then((response) => {
        this.setState({
          searchQuery: q, autocompleteList: response.data
        })
      })
    }
  }

  handleClose = (e) => {
    this.setState({ searchState : 'close',
      searchButtonIcon: 'search'
    })
  }
  handleSelectQuery = (e) => {
    if (e.target.className === 'icon-update-query') {
      let target = e.target.parentNode
      let q = this.state.autocompleteList[target.id]
      this.getAutocomplete(q).then((response) => {
        this.setState({
          searchQuery: q, autocompleteList: response.data
        })
      })
    } else {
      let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target
      this.setState({ searchState: 'close', searchButtonIcon: 'search' })
      this.props.searchSongs(this.state.autocompleteList[target.id])
    }
  }

  handleClickSearch = (e) => {
    this.setState({ searchState : 'open',
      searchQuery: '',
      autocompleteList: [] })
  }

  getAutocomplete = (q) => {
    const request = axios({
      method: 'get',
      params: { q: q },
      url: `${ROOT_URL_API}/autocomplete`,
      headers: []
    })

    return request
  }

  render () {
    return (
      <Header onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        searchQuery={this.state.searchQuery}
        searchState={this.state.searchState}
        onClickSearch={this.handleClickSearch}
        autocompleteList={this.state.autocompleteList}
        onSelect={this.handleSelectQuery}
        onClose={this.handleClose} />
    )
  }
}

HeaderContainer.propTypes = {
  autocompleteList: PropTypes.array.isRequired,
  getAutocomplete: PropTypes.func.isRequired,
  searchSongs: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
