import React from 'react'
import { Search } from './search'
import { SearchList } from './search-list'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [], favorites: [] }
    this.getChannel = this.getChannel.bind(this)
    this.addChannel = this.addChannel.bind(this)
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
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ list: this.state.list.filter(channel => {
          return channel._id !== twitchId.twitch_id
        })
        })
        // this.setState({ favorites: [data].concat(this.state.favorites) })
      })
  }

  render() {
    return (
      <div>
        <div className="search-bar">
          <Search getChannel={this.getChannel} />
        </div>
        <div>
          <SearchList list={this.state.list} addChannel={this.addChannel} />
        </div>
      </div>
    )
  }
}
