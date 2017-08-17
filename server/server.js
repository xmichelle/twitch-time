require('dotenv').config()

const request = require('request')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const knex = require('knex')({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
})

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)
app.use(bodyParser.json())

const clientId = process.env.CLIENT_ID

app.get('/search', (req, res) => {
  const channelSearchOptions = {
    url: `https://api.twitch.tv/kraken/search/channels?query=${req.query.term}&client_id=${clientId}`,
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json'
    },
    json: true
  }
  request(channelSearchOptions, (err, response, body) => {
    if (err) console.log(err)
    else if (!err && response.statusCode === 200) {
      res.json(body)
    }
  })
})

function channelQuery(id) {
  return {
    url: 'https://api.twitch.tv/kraken/channels/' + id,
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientId
    },
    json: true
  }
}

function streamQuery(id) {
  return {
    url: 'https://api.twitch.tv/kraken/streams/' + id,
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientId
    },
    json: true
  }
}

function addStreamInfo(channels, streams) {
  for (let i = 0; i < channels.length; i++) {
    for (let j = 0; j < streams.length; j++) {
      if (streams[j].stream !== null && Number(channels[i]._id) === streams[j].stream.channel._id) {
        const stream = {stream: true}
        Object.assign(channels[i], stream)
      }
    }
  }
  return channels
}

app.get('/favorites', (req, res) => {
  knex
    .select('twitch_id')
    .from('streamers')
    .then(data => {
      const channelRequests = []
      data.forEach(channel => {
        channelRequests.push(new Promise((resolve, reject) => {
          request(channelQuery(channel.twitch_id), (err, response, body) => {
            if (err) reject(err)
            resolve(body)
          })
        }))
      })

      const streamRequests = []
      data.forEach(channel => {
        streamRequests.push(new Promise((resolve, reject) => {
          request(streamQuery(channel.twitch_id), (err, response, body) => {
            if (err) reject(err)
            resolve(body)
          })
        }))
      })

      Promise.all([
        Promise.all(channelRequests), Promise.all(streamRequests)
      ])
        .then(combinedResults => {
          const results = addStreamInfo(combinedResults[0], combinedResults[1])
          res.send(results)
        })
        .catch(err => console.log(err))
    })

})

function findTwitchId(id) {
  const query = knex
    .select('twitch_id')
    .from('streamers')
    .where('twitch_id', id)
  return query
}

function insertTwitchId(channelId) {
  const query = knex
    .insert(channelId)
    .into('streamers')
    .returning('*')
  return query
}

app.post('/favorites', (req, res) => {
  const channelId = req.body
  findTwitchId(channelId.twitch_id)
    .then(data => {
      if (data.length < 1) {
        insertTwitchId(channelId)
          .then(data => res.status(201).json(data))
      }
    })
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT)
})
