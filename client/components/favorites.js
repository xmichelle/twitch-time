import React from 'react'

export class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.favorites = this.props.ravorites
  }
  render() {
    return (
      <div>Hello World</div>
    )
  }
}
