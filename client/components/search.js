import React from 'react'

export class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { search: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('Submitting search form')

    const searchData = new FormData(event.target)

    const searchInput = searchData.get('search')
    const modifiedSearchInput = searchInput.toLowerCase().split(' ').join('')

    const newSearch = {
      search: modifiedSearchInput
    }

    this.props.getChannel(newSearch.search)
    event.target.reset()

  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper black">
          <form onSubmit={ this.handleSubmit }>
            <div className="input-field">
              <input placeholder="Find a Twitch channel" id="search" type="search" name="search" required />
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
            <div>
              <button className="btn waves-effect waves-light black" type="submit" name="action" id="search-button">Search
              </button>
            </div>
          </form>
        </div>
      </nav>
    )
  }
}
