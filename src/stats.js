const request = require('request')
const categories = require('./categories')

const classifier = (items , access_token)=>{
    items.forEach((item)=>{
        var artistId = item.track.artists[0].id
        let headers = {
            url: `https://api.spotify.com/v1/artists/${artistId}`,

            headers: {
                'Authorization': access_token
            },
            json: true
        }

        request.get(headers , (error, response , body)=>{
            console.log(response.body)
        })
    })
}
module.exports = classifier