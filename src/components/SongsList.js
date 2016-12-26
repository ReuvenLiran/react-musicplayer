import '../styles/SongList.scss'
import React, { Component, PropTypes } from 'react'
import SongItem from '../containers/SongItemContainer'
import { Card } from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { TABLE_HEADER_FONT_COLOR, TABLE_FONT_COLOR, BASE_COLOR3 } from '../constants'

class SongsList extends Component {

  cardStyle = {
    'marginLeft' : '1vw',
    'marginRight' : '1vw',
    'marginTop' : '3vh',
    'backgroundColor' : BASE_COLOR3
  }

  tableHeaderStyle = {
     'color' : TABLE_HEADER_FONT_COLOR, 
     'fontSize' : '18px'  
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
          <Card style={this.cardStyle}>

            <Table style={{ 'backgroundColor' : BASE_COLOR3 }}>

              <TableHeader className='hidden-xs-down'
                displaySelectAll={false}
                adjustForCheckbox={false}>

                <TableRow>
                  <TableHeaderColumn style={this.tableHeaderStyle} >Name</TableHeaderColumn>
                  <TableHeaderColumn style={this.tableHeaderStyle}>Artist</TableHeaderColumn>
                  <TableHeaderColumn style={this.tableHeaderStyle}><i className='material-icons'>access_time</i></TableHeaderColumn>
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
