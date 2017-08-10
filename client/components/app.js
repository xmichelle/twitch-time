import React from 'react'
import { Search } from './search'
import { SearchList } from './search-list'

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
        this.setState({ list: data.channels }) // data returns an object of property channels set equal to an array of objects
      })
  }

  render() {
    return (
      <div>
        <div className="search-bar">
          <Search getChannel={this.getChannel} />
        </div>
        <div>
          <SearchList list={this.state.list}/>
        </div>
      </div>
    )
  }
}
