const express = require('express')
const request = require('request')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const {classifier , userGenreHistory} = require('./stats')
var access_token = null

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const publicDir = path.join(__dirname , '../public/')
app.use(express.static(publicDir))
app.set('view engine', 'html')

let redirect_uri = 'http://127.0.0.1:3000/callback'


app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-recently-played',
      redirect_uri
    }))
})

app.get('/dashboard',(req,res)=>{
  res.sendFile(path.resolve(__dirname + '/../public/dashboard.html'))
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
    let uri = process.env.FRONTEND_URI || 'http://127.0.0.1:3000/dashboard'
    res.redirect(uri + '?access_token=' + access_token)
  })
})

app.get('/stats', (req,res)=>{
    access_token = req.query.access_token
    let headers = {
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=50',
        
        headers: {
          'Authorization': req.query.access_token
        },
        json: true
    }

    request.get(headers, function(error, response, body) { 
        classifier(response.body.items , access_token)
        setTimeout(()=>{
          console.log(userGenreHistory)
          res.send(userGenreHistory)
        }, 3000 )
        
    })

})

let port = process.env.PORT || 3000
console.log(`Listening on port ${port}.`)
app.listen(port)