import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import {lightBlack} from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'

function renderFavorites() {
  return fetch('./favorites')
}

export class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {favorites: null}
  }
  componentDidMount() {
    renderFavorites()
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({favorites: data})
      })
  }
  render() {
    if (this.state.favorites) {
      const favorites = this.state.favorites.map(channel => {
        return (
          <div key={channel._id}>
            <ListItem
              leftAvatar={<Avatar src={channel.logo} />}
              primaryText={
                <p>{channel.display_name}<span style={{color: lightBlack, paddingLeft: 15}}>Followers: {channel.followers}</span></p>
              }
              secondaryText={
                <p>{channel.description}</p>
              }
            />
            <Divider inset={true}/>
          </div>
        )
      })
      return (
        <List>
          <Subheader>Your Saved Favorites</Subheader>
          {favorites}
        </List>)
    }
    return (<CircularProgress id="loading-favorites" size={80} thickness={5} />)
  }
}
