import React, { Component } from 'react'
// import AppBar from 'material-ui/AppBar'
import '../styles/Header.scss'
import classnames from 'classnames'

import { HEADER_FONT_COLOR, BASE_COLOR1 } from '../constants'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// const Header = () => {
//  let brandLogo = classnames('brand-logo', { 'hidden' : this.refs.searchInput })

class Header extends Component {

  componentWillMount () {
    this.state = {
      searchQuery : '',
      inputFocus : false
    }
  }
  componentWillUpdate (props, state) {
    if (props.searchList !== undefined) {
      if (props.searchList.loading !== true) {
        console.log('aaaaaaaaa')
        this.props.onSearch(props.searchList)
      }
    }
  }
  componentDidMount () {

    /* $(this.refs.searchInput).autocomplete({
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': 'http://placehold.it/250x250'
      }
    }) */
  }

  handleBlur = (e) => {
    this.setState({ inputFocus : false })
  }

  handleFocus = (e) => {
    this.setState({ inputFocus : true })
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

  handleClick = (e) => {
    if (this.state.inputFocus === false) {
      this.props.searchSongs(this.state.searchQuery)
    } else {
      this.refs.inputSearch.blur()
    }
  }
  renderDataList (autocompleteList) {
    if (autocompleteList === undefined) {
      return
    }
    return autocompleteList.map((q, index) => {
      let opt = 'opt' + index
      return (
        <option id={opt} value={q} />
      )
    })
  }

  render () {
    let brandLogoClass = classnames('brand-logo', { 'hidden': this.state.inputFocus })
    let inputSearchClass = classnames({ 'full-width': this.state.inputFocus })
    const { autocompleteList } = this.props
    return (
      <div>
        <nav className='app-header'>
          <div className='nav-wrapper'>
            <a href='#!' className={brandLogoClass}>
              <i className='material-icons'>cloud</i></a>

            <form id='search-form' className={inputSearchClass}>
              <div className='input-field'>
                <input list='songs' id='search' type='search' placeholder='search'
                  autoComplete='off' onChange={this.handleChange} onFocus={this.handleFocus}
                  onBlur={this.handleBlur} value={this.state.searchQuery}
                  ref='inputSearch' required />
                <i id='search-btn' onClick={this.handleClick} className='material-icons' />
                <datalist id='songs'>
                  { this.renderDataList(autocompleteList) }
                </datalist>
              </div>
            </form>
          </div>
        </nav>
      </div>
    )
  }
}
/*
  return (
    <div>
      <nav className='app-header'>
        <div className='nav-wrapper'>
          <a href='#!' className='brand-logo'>
            <i className='material-icons'>cloud</i></a>

          <form id='search-form'>
            <div className='input-field'>
              <input id='search' type='search' placeholder='search'
                ref='searchInput' className='autocomplete' required />
              <i id='search-btn' className='material-icons' />
            </div>
          </form>
        </div>
      </nav>
    </div>
  )
} */

export default Header
