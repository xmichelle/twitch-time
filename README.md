# twitch-time
A web app for Twitch users who want to be notified when their favorite streamers are streaming.

![twitch-time](https://user-images.githubusercontent.com/29046211/29437066-81792c86-8363-11e7-81f8-4a63d1bcf71c.gif)

## Setup
Install [Git](https://git-scm.com/), [Node](https://nodejs.org/en/), [Brew](https://brew.sh/).

    $ git clone https://github.com/xmichelle/twitch-time.git
    $ cd twitch-time
    $ npm install
    $ brew install postgresql
    $ brew services start postgresql
    $ createuser [username]
    $ createdb -O [owner] streamers
    $ npm run db:up
    $ npm run watch

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

## Technologies Used
  * [React](https://facebook.github.io/react/)
  * [Express](https://expressjs.com/)
  * [PostgreSQL](https://www.postgresql.org/)
  * [Babel](https://babeljs.io/)
  * [Material-UI](http://www.material-ui.com/#/)
