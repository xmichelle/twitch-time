import React from 'react'
import { Search } from './search'
import { SearchList } from './search-list'
import { Favorites } from './favorites'

function determineView(component) {
  if (component.state.view === 'Search') {
    return (
      <SearchList list={component.state.list} addChannel={component.addChannel} />
    )
  }
  else if (component.state.view === 'Favorites') {

    return (
      <Favorites favorites />
    )
  }
}

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
      .then(res => res.json())
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
    const view = determineView(this)
    return (
      <div>
        <Search getChannel={this.getChannel} switchView={this.switchView}/>
        {view}
      </div>
    )
  }
}
