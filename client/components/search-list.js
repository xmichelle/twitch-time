import React from 'react'

export class SearchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
  }

  render() {
    console.log(this.props.list)
    return (
      <div>
        {
          this.props.list.map((channel, i) => {
            return <div key={i}>{channel.display_name}</div>
          })
        }
      </div>
    )
  }
}
