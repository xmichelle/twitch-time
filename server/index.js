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
  console.log(req.query)
  // req.query will return an object so need to specify the property in order to get the value; temporary property will be named term
  const channelSearchOptions = {
    url: `https://api.twitch.tv/kraken/search/channels?query=${req.query.term}&client_id=${clientId}`,
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json'
    },
    json: true
  }
  request(channelSearchOptions, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.json(body)
    }
  })
})

app.get('/favorites', (req, res) => {
  knex
    .select('*')
    .from('streamers')
    .then((data) => {
      res.json(data)
    })
})

app.post('/favorites', (req, res) => {
  const channelData = req.body
  knex
    .insert(channelData)
    .into('streamers')
    .returning('*')
    .then((data) => {
      res.status(201).json(data)
    })
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT)
})
