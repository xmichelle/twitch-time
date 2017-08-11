import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import {lightBlack} from 'material-ui/styles/colors'

export class SearchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
  }

  render() {
    console.log(this.props.list)
    return (
      <div>
        <List>
          <Subheader>Search Results</Subheader>
          {
            this.props.list.map((channel, i) => {
              return <div key={i}>
                <ListItem
                  leftAvatar={<Avatar src={channel.logo} />}
                  primaryText={
                    <p>{channel.display_name}<span style={{color: lightBlack, paddingLeft: 15}}>Followers: {channel.followers}</span></p>
                  }
                  secondaryText={
                    <p>{channel.description}</p>
                  }
                />
                <Divider inset={true}/>
              </div>
            })
          }
          <Divider inset={true} />
        </List>
      </div>

    )
  }
}
