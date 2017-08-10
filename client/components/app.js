import React from 'react'
import { Search } from './search'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
    this.getChannel = this.getChannel.bind(this)
  }

  // componentDidMount() {
  //   fetch('./favorites')
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({ list: data })
  //     })
  // }

  getChannel(search) {
    fetch('./search?term=' + search)
      .then(res => res.json())
      .then(data => {
        this.setState({ list: data })
      })
  }

  render() {
    return (
      <div>
        <div className="search-bar">
          <Search getChannel={this.getChannel} list={this.state.list}/>
        </div>
      </div>
    )
  }
}
