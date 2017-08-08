
require('dotenv').config()
const request = require('request')

const clientId = process.env.CLIENT_ID
const idUrl = `https://api.twitch.tv/kraken/users?login=nightblue3&client_id=${clientId}`
const streamUrl = `https://api.twitch.tv/kraken/streams/26946000?client_id=${clientId}`
const channelUrl = `https://api.twitch.tv/kraken/channels/26946000?client_id=${clientId}`

const idOptions = {
  url: idUrl,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json'
  },
  json: true
}

const streamOptions = {
  url: streamUrl,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json'
  },
  json: true
}

const channelOptions = {
  url: channelUrl,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json'
  },
  json: true
}

request(idOptions, (err, res, body) => {
  console.log(err)
  console.log(body)
})

request(streamOptions, (err, res, body) => {
  console.log(err)
  console.log(body)
})

request(channelOptions, (err, res, body) => {
  console.log(err)
  console.log(body)
})

// when stream is not in session, value is null on stream property
// when stream is in session, value is an object

// channel info gives description, logo, views, followers, display name

// Get id from login
// use id to get stream and channel info
