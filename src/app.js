const express = require('express')
const request = require('request')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const publicDir = path.join(__dirname , '../public/')
app.use(express.static(publicDir))
app.set('view engine', 'html')

let redirect_uri = 
  'http://127.0.0.1:3000/callback'

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-recently-played',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://127.0.0.1:3000/'
    res.redirect(uri + '?access_token=' + access_token)
  })
})

app.get('/stats', (req,res)=>{
    console.log(req.query.access_token)
    let headers = {
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        
        headers: {
          'Authorization': req.query.access_token
        },
        json: true
    }

    request.post(headers, function(error, response, body) { 
        console.log(response.body)
        res.send(response)
    })

})

let port = process.env.PORT || 3000
console.log(`Listening on port ${port}.`)
app.listen(port)