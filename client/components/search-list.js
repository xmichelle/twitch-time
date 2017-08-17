import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import {lightBlack} from 'material-ui/styles/colors'
import Snackbar from 'material-ui/Snackbar'
// import CircularProgress from 'material-ui/CircularProgress'

export class SearchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [], open: false, displayName: '', search: false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(channel) {
    const twitchId = { twitch_id: channel._id }

    this.setState({ open: true, displayName: channel.display_name })
    this.props.addChannel(twitchId)
  }

  // isSearching() {
  //   if (this.props.list.length > 1) {
  //     this.setState({ search: true })
  //   }
  // }

  render() {
    // console.log(this.props.list)
    // if (this.props.list.length < 1 && this.state.search === true) {
    //   return (
    //     <CircularProgress id="loading-searches" size={80} thickness={5} />
    //   )
    // }
    // when searching, show loading icon
    return (
      <div>
        <List>
          <Subheader>Search Results</Subheader>
          {
            this.props.list.map((channel, i) => {
              return <div key={i} onClick={() => this.handleClick(channel)}>
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
        </List>
        <Snackbar
          open={this.state.open}
          message= {this.state.displayName + ' has been added to your favorites'}
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

// update snackbar to if/else statement
// show loading icon when getting search list
