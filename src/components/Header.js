import React, { Component } from 'react'
import '../styles/Header.scss'
import classnames from 'classnames'

class Header extends Component {

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
    let brandLogoClass = classnames('brand-logo', { 'hidden': this.props.inputFocus })
    let inputSearchClass = classnames({ 'full-width': this.props.inputFocus })
    let searchButtonClass = classnames('material-icons search-btn', { 'hidden': this.props.inputFocus })
    let closeButtonClass = classnames('material-icons close-btn', { 'hidden': !this.props.inputFocus })

    return (
      <div>
        <nav className='app-header'>
          <div className='nav-wrapper'>
            <a href='#!' className={brandLogoClass}>
              <i className='material-icons'>library_music</i></a>

            <form id='search-form' className={inputSearchClass}>
              <div className='input-field'>
                <input list='songs' id='search' type='search' placeholder='search'
                  autoComplete='off' onChange={this.props.onChange} onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur} value={this.props.searchQuery}
                  ref='inputSearch' required />
                <i id='search-btn' onClick={this.props.onSearch} className={searchButtonClass}>
                  search
                </i>
                <i id='close-btn' className={closeButtonClass}>
                 close
                </i>
                <datalist id='songs'>
                  { this.renderDataList(this.props.autocompleteList) }
                </datalist>
              </div>
            </form>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header
