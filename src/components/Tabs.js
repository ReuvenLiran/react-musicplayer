import React, { PropTypes } from 'react'
import '../styles/Tabs.scss'

const Tabs = ({ onClick, activeTab }) => {
  return (
    <div className='row tabs-no-padding'>
      <div className='col s12 tabs-no-padding' style={{ 'padding' : '0' }}>
        <ul className='tabs'>
          <li id={0} className='tab col s6'
            onClick={onClick}>
                    SONGS
          </li>
          <li id={1} className='tab col s6'
            onClick={onClick}>
                    ARTISTS
          </li>
        </ul>
      </div>
    </div>

  )
}

Tabs.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired
}

export default Tabs

