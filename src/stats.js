const request = require('request')
const {categories , filteredCategories} = require('./categories')
var userGenres = []
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
            //console.log(genres)
            let selectedGenre = null
           
            for(let i = 0 ; i < genres.length ; i++){
                for(let j = 0 ; j < categories.length ; j++){
                    if(categories[j][0] === genres[i]){
                        selectedGenre = categories[j][1]
                        break

                    }
                }
                
                if(selectedGenre === null){
                    for(let k = 0 ; k < filteredCategories.length ; k++){
                        if(genres[i].includes(categories[k])){
                            selectedGenre = categories[k]
                            break
                        }
                    }
                } else {
                    userGenres.push(selectedGenre)
                    break
                }

            }


        })




        
    })

    // SET UP ASYNC AWAIT TO GET ACCESS TO USERGENRES HERE
    

}




module.exports = classifier