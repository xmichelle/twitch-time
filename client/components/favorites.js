import React from 'react'

class Favorites extends React.Component {
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

export default Favorites
