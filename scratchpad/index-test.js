
require('dotenv').config()
const request = require('request')

const clientId = process.env.CLIENT_ID

const idUrl = `https://api.twitch.tv/kraken/users?login=nightblue3&client_id=${clientId}`
const idOptions = {
  url: idUrl,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json'
  },
  json: true
}

request(idOptions, (err, res, body) => {
  console.log(err)
  console.log(body)
})

const streamUrl = `https://api.twitch.tv/kraken/streams/26946000?client_id=${clientId}`
const streamOptions = {
  url: streamUrl,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json'
  },
  json: true
}

request(streamOptions, (err, res, body) => {
  console.log(err)
  console.log(body)
})

const channelUrl = `https://api.twitch.tv/kraken/channels/26946000?client_id=${clientId}`
const channelOptions = {
  url: channelUrl,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json'
  },
  json: true
}

request(channelOptions, (err, res, body) => {
  console.log(err)
  console.log(body)
})

const channelSearchUrl = `https://api.twitch.tv/kraken/search/channels?query=nightblue3&client_id=${clientId}`
const channelSearchOptions = {
  url: channelSearchUrl,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json'
  },
  json: true
}

request(channelSearchOptions, (err, res, body) => {
  console.log(err)
  console.log(body)
})

const channelIdUrl = `https://api.twitch.tv/kraken/channels/128000123?client_id=${clientId}`
const channelIdOptions = {
  url: channelIdUrl,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json'
  },
  json: true
}

request(channelIdOptions, (err, res, body) => {
  console.log(err)
  console.log(body)
})

// when stream is not in session, value is null on stream property
// when stream is in session, value is an object

// channel info gives description, logo, views, followers, display name

// Get id from login
// use id to get stream and channel info

// channelSearch gives id, display name, logo, description, views, followers, etc
