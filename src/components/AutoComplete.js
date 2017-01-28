import React, { PropTypes } from 'react'
import '../styles/AutoComplete.scss'
import classnames from 'classnames'

const AutoComplete = ({ autocompleteList, autoCompleteState, onSelect }) => {
  let autocompleteClass =
  classnames('collection autocomplete-container',
    { 'show': autoCompleteState === 'show',
      'disappear' :  autoCompleteState === 'close',
      'disappear-solo' : autoCompleteState === 'close-solo' })
/*
  let fillAutocomplete = (q) => {
    const request = axios({
      method: 'get',
      params: { q: q },
      url: `${ROOT_URL_API}/autocomplete`,
      headers: []
    }).then((response) => {
      console.log(response.data)
      return response.data
    })
    return []
  }
*/
  return (

    <ul className={autocompleteClass} id='songs'>
      {autocompleteList.map((q, index) => {
        return <li id={index.toString()} className='collection-item autocomplete-item'
          onClick={onSelect}>
          <span className='autocomplete-query'>{q}</span>
          <img className='icon-update-query' src='arrow1.png' />
        </li>
      })
      }
    </ul>
  )
}

AutoComplete.propTypes = {
  autocompleteList: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  autoCompleteState: PropTypes.string.isRequired
}

export default AutoComplete
