import React, { PropTypes } from 'react'
import '../styles/Header.scss'
import classnames from 'classnames'
import AutoComplete from './AutoComplete'
import Search from './Search'

const Header = ({ autocompleteList, onFocus, onBlur, searchState,
                  searchQuery, onClickSearch, onChange, onSelect, onClose }) => {
  let autoCompleteState

  if (searchState === 'open' && searchQuery !== '') {
    autoCompleteState = 'show'
  } else if (searchState === 'open' && searchQuery === '') {
    autoCompleteState = 'close-solo'
  } else {
    autoCompleteState = 'close'
  }

  let brandLogoClass = classnames('brand-logo',
    { 'hidden': searchState === 'open',
      'display': searchState === 'close' && searchQuery !== '',
      'quick-display' : searchState === 'close' && searchQuery === ''
    })
  let searchButtonClass = classnames('material-icons right search-btn',
    { 'hidden': searchState === 'open',
      'display': searchState === 'close' && searchQuery !== '',
      'quick-display' : searchState === 'close' && searchQuery === ''
    })

  const renderAutoComplete = () => {
    return (
      <AutoComplete onSelect={onSelect}
        autocompleteList={autocompleteList}
        autoCompleteState={autoCompleteState} />
    )
  }

  return (
    <div>
      <nav className='app-header'>
        <div className='nav-wrapper'>
          <a href='#!' className={brandLogoClass} style={{ 'marginLeft' : '30px' }}>
            <i className='material-icons'>library_music</i></a>

          <i style={{ 'color' : 'white', 'marginRight' : '30px' }}
            onClick={onClickSearch} className={searchButtonClass}>
                  search
          </i>
          <Search onFocus={onFocus}
            onBlur={onBlur}
            searchQuery={searchQuery}
            searchState={searchState}
            onChange={onChange}
            onSelect={onSelect}
            onClose={onClose}
            autoComplete={renderAutoComplete} />
        </div>
      </nav>
    </div>
  )
}

Header.propTypes = {
  autocompleteList: PropTypes.array.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  inputFocus: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchState: PropTypes.string.isRequired
}

export default Header
