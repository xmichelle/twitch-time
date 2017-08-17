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
    console.log(this.state.favorites)
    if (this.state.favorites) {
      const favorites = this.state.favorites.map((channel, i) => {
        return (
          <div key={i}>
            <ListItem
              leftAvatar={<Avatar src={channel.logo} />}
              primaryText={
                <p>{channel.display_name}<span style={{color: lightBlack, paddingLeft: 15}}>Followers: {channel.followers}</span></p>
              }
              secondaryText={
                <p>
                  {/* <span style={{color: lightBlack}}>
                    Stream Status: {channel.stream}
                  </span> */}
                  <br></br>
                  {channel.description}
                </p>
              }
              secondaryTextLines={2}
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
    return (
      <CircularProgress id="loading-favorites" size={80} thickness={5} />
    )
  }
}
