const request = require('request')
const {categories , filteredCategories} = require('./categories')
var userGenres = []
const userGenreHistory = []

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
                        //console.log(genres[i])
                        selectedGenre = categories[j][1]
                        break
    
                    }
                }
                
                if(selectedGenre !== null){
                    userGenres.push(selectedGenre)
                    break
                } 
    
            }
    
        
        })

        
    })

    setTimeout(()=>{
        categoryCounter(userGenres)
    },3000)
    // SET UP ASYNC AWAIT TO GET ACCESS TO USERGENRES HERE
    

}

const categoryCounter = (userGenres)=>{
    let prev = null
    let genres = [] , count = []
    userGenres.sort()
    userGenres.forEach((genre)=>{
        if(genre!==prev){
            genres.push(genre)
            count.push(1)
        } else {
            count[count.length-1]++
        }

        prev = genre
        
    })

    genres.forEach((genre , index)=>{
        userGenreHistory.push([genre , count[index]])
    })
   // console.log(userGenreHistory)
}

module.exports = {userGenreHistory , classifier}