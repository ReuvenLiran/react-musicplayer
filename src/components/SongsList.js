import '../styles/SongList.scss'
import React, { Component, PropTypes } from 'react'
import SongItem from '../containers/SongItemContainer'
import { Card } from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

class SongsList extends Component {

  componentWillMount () {
   // this.props.fetchSongs()
  }

  renderSongs (songs) {
    return songs.map((song) => {
      return (
        <SongItem song={song} />
      )
    })
  }

  render () {
    const { songs } = this.props
    console.log('SongsList', songs)

    return (
      <div className='container'>
        <MuiThemeProvider>
          <Card style={{ 'marginLeft' : '1vw',
            'marginRight' : '1vw',
            'marginTop' : '3vh' }}>
            <Table>
              <TableHeader className='hidden-xs-down' 
                displaySelectAll={false}
                adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{ 'fontSize' : '18px' }}>Name</TableHeaderColumn>
                  <TableHeaderColumn style={{ 'fontSize' : '18px' }}>Artist</TableHeaderColumn>
                  <TableHeaderColumn style={{ 'fontSize' : '18px' }}><i className="material-icons">access_time</i></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox='false'>
                {this.renderSongs(songs)}
              </TableBody>
            </Table>
          </Card>
        </MuiThemeProvider>
      </div>
    )
  }
}

SongsList.propTypes = {
  songs: PropTypes.array.isRequired
}

export default SongsList
