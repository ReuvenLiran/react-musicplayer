import React, { PropTypes } from 'react'
import '../styles/CircularProgress.scss'
import { DOWNLOAD_YOUTUBE, ROOT_URL } from '../utils/constants'
import { connect } from 'react-redux'

const FloatButton = ({ icon, activeSong }) => {
  let link
  let download

  if (activeSong.artists[0] === 'Youtube') {
    link = DOWNLOAD_YOUTUBE + activeSong.id
    download = false
    console.log(link)
  } else {
    link = ROOT_URL + activeSong.file
    download = true
  }

  return (
    <a className='btn-floating btn-large waves-effect waves-light btn-download' 
      href={link} download={download}>
      <i className='material-icons'>{icon}</i>
    </a>
  )
}

const mapStateToProps = (state) => {
  return {
    activeSong: state.songs.activeSong
  }
}

FloatButton.propTypes = {
  icon: PropTypes.string.isRequired,
  activeSong: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(FloatButton)

