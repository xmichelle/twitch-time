import React from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import {grey50} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

export class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { search: '', open: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
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

  handleToggle() {
    this.setState({ open: !this.state.open })
  }

  handleClose() {
    this.setState({ open: false })
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
    return (
      <AppBar
        title="Twitch Time"
        iconElementLeft={
          <div>
            <IconButton onClick={this.handleToggle}>
              <FontIcon className="material-icons" color={grey50}>menu</FontIcon>
            </IconButton>
            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={open => this.setState({open})}
            >
              <MenuItem onClick={this.handleClose}>Search</MenuItem>
              <MenuItem onClick={this.handleClose}>Favorites</MenuItem>
              <MenuItem onClick={this.handleClose}>Close</MenuItem>
            </Drawer>
          </div>
        }
        iconElementRight={
          <form style={formStyle} onSubmit={this.handleSubmit}>
            <FontIcon className="material-icons" style={searchStyle} color={grey50}>search</FontIcon>
            <TextField
              hintText="Find a Twitch Channel"
              value={this.state.search}
              onChange={this.handleChange}
            />
          </form>
        }
      />
    )
  }
}
