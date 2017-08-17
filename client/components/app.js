import React from 'react'
import { Search } from './search'
import { SearchList } from './search-list'
import { Favorites } from './favorites'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [], favorites: [], view: 'Search' }
    this.getChannel = this.getChannel.bind(this)
    this.addChannel = this.addChannel.bind(this)
    this.switchView = this.switchView.bind(this)
  }

  getChannel(search) {
    fetch('./search?term=' + search)
      .then(res => res.json())
      .then(data => {
        this.setState({ list: data.channels })
      })
  }

  addChannel(twitchId) {
    fetch('./favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(twitchId)
    })
      .then(res => {
        if (res.status === 204) return {}
        else res.json()
      })
      .then(data => {
        this.setState({ list: this.state.list.filter(channel => {
          return channel._id !== twitchId.twitch_id
        }) })
      })
  }

  switchView(param) {
    this.setState({view: param})
  }

  render() {
    return (
      <div>
        <Search getChannel={this.getChannel} switchView={this.switchView} />
        {
          this.state.view === 'Search'
            ? (<SearchList list={this.state.list} addChannel={this.addChannel} />)
            : (<Favorites />)
        }
      </div>
    )
  }
}
