import React from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import {grey50} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'

export class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { search: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ search: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('Submitting search form')

    const searchInput = this.state.search

    const modifiedSearchInput = searchInput.toLowerCase().split(' ').join('')

    const newSearch = {
      search: modifiedSearchInput
    }

    this.props.getChannel(newSearch.search)

    this.setState({ search: '' })
  }

  render() {
    const searchStyle = {
      position: 'relative',
      top: 10,
      right: 5
    }
    const formStyle = {
      position: 'relative',
      bottom: 10
    }
    const sendStyle = {
      position: 'relative',
      top: 8
    }
    return (
      <AppBar
        title="Twitch Time"
        iconElementRight={
          <form style={formStyle} onSubmit={this.handleSubmit}>
            <FontIcon className="material-icons" style={searchStyle} color={grey50}>search</FontIcon>
            <TextField
              hintText="Find a Twitch Channel"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <IconButton style={sendStyle}>
              <FontIcon className="material-icons" color={grey50}>send</FontIcon>
            </IconButton>
          </form>
        }
      />
    )
  }
}
