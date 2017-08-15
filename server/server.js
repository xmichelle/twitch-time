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

app.get('/favorites', (req, res) => {
  knex
    .select('twitch_id').from('streamers')
    .then(data => {
      const requestsToTwitch = []
      data.forEach(channel => {
        requestsToTwitch.push(new Promise((resolve, reject) => {
          request(channelQuery(channel.twitch_id), (err, response, body) => {
            if (err) reject(err)
            resolve(body)
          })
        }))
      })
      Promise.all(requestsToTwitch)
        .then((results) => {
          return res.send(results)
        })
        .catch(errors => console.log(errors))
    })
})

app.post('/favorites', (req, res) => {
  const channelId = req.body
  knex
    .insert(channelId)
    .into('streamers')
    .returning('*')
    .then(data => {
      res.status(201).json(data)
    })
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT)
})
