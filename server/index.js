require('dotenv').config()

const request = require('request')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)
app.use(bodyParser.json())

const clientId = process.env.CLIENT_ID
// const channelQueryUrl = 'https://api.twitch.tv/kraken/search/channels?query=' + '' + '&client_id=' + clientID
const testChannel = `https://api.twitch.tv/kraken/search/channels?query=nightblue3&client_id=${clientId}`

const channelSearchOptions = {
  url: testChannel,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json'
  },
  json: true
}

app.get('/search', (req, res) => {
  request(channelSearchOptions, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.json(body)
    }
  })
})

const favoriteChannels = []

app.get('/favorites', (req, res) => {
  res.json(favoriteChannels)
})

app.post('/favorites', (req, res) => {
  favoriteChannels.push(req.body)
  res.sendStatus(201)
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT)
})
