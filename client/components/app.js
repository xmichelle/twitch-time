import React from 'react'
import { Search } from './search'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
    this.getChannel = this.getChannel.bind(this)
  }

  // getChannel(search) {
  //
  //   fetch('./search')
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({ list: data })
  //     })
  // }

  render() {
    return (
      <div>
        <div className="search-bar">
          <Search list={this.state.list} handleSubmit={this.getChannel}/>
        </div>
      </div>
    )
  }
}
