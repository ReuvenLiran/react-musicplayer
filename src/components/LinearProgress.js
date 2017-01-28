import React, { PropTypes } from 'react'
import '../styles/LinearProgress.scss'

const LinearProgress = ({ progress }) => {
  let width = { 'width' :  progress + '%' }
  return (
    <div className='progress linear-progress'>
      <div className='determinate' style={width} />
    </div>
  )
}

LinearProgress.propTypes = {
  progress: PropTypes.number.isRequired
}
export default LinearProgress
