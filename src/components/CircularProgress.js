import React from 'react'
import '../styles/CircularProgress.scss'

const CircularProgress = () => {
  return (
    <div id='CircularProgress'>
      <div className='preloader-wrapper big active'>
        <div className='spinner-layer'>
          <div className='circle-clipper left'>
            <div className='circle' />
          </div>
          <div className='gap-patch'>
            <div className='circle' />
          </div>
          <div className='circle-clipper right'>
            <div className='circle' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircularProgress
