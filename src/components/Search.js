import React, { PropTypes } from 'react'
import '../styles/Search.scss'
import classnames from 'classnames'

const Search = ({ autoComplete, onFocus, onBlur, onSearch, searchState
                      , searchQuery, onChange, onClose }) => {
  let inputSearchClass = classnames({
    'show': searchState === 'open',
    'disappear' : searchState === 'close' && searchQuery !== '',
    'disappear-solo' : searchState === 'close' && searchQuery === ''
  })
  let closeButtonClass = classnames('material-icons close-btn')

  return (
    <form id='search-form' className={inputSearchClass} onSubmit={onSearch}>
      <div className='input-field'>

        <input list='songs' id='search-input' type='search'
          placeholder='search' autoComplete='off'
          onChange={onChange} onFocus={onFocus}
          onBlur={onBlur} value={searchQuery}
          ref={input => { // Set auto focus
            if (searchState === 'open' && searchQuery === '' && input !== null) { input.focus() }
          }} />

        <i id='close-btn' onClick={onClose} className={closeButtonClass}>
                 close
        </i>
      </div>
      {autoComplete()}
    </form>
  )
}

Search.propTypes = {
  autocompleteList: PropTypes.array.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  inputFocus: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  autoComplete: PropTypes.object,
  searchState: PropTypes.string.isRequired
}

export default Search
