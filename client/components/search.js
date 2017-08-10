import React from 'react'

export class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { searches: '' }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper black">
          <form>
            <div className="input-field">
              <input placeholder="Find a Twitch channel" id="search" type="search" required />
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
            <div>
              <button className="btn waves-effect waves-light black" type="submit" name="action">Search
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </nav>
    )
  }
}
