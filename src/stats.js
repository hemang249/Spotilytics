const request = require('request')
const {categories , filteredCategories} = require('./categories')
const userGenres = []
const userGenreHistory = {}

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
            let genres = response.body.genres
            let selectedGenre = null
            genres.forEach((genre)=>{
                filteredCategories.forEach((category)=>{
                    if(genre.includes(category)){
                        selectedGenre = category
                        return
                    }
                })
                


                userGenres.push(selectedGenre)
            })
            console.log(userGenres)


        })
    })
}




module.exports = classifier