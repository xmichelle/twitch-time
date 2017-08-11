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

app.get('/search', (req, res) => {
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

app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT)
})
