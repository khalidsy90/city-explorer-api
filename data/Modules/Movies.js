'use strict'

const axios=require('axios')

const getTheMovies=async(request,response)=>{
    try {
      let city=request.query.query
      let result=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`)
      let mov=result.data.results.map(item =>{
          return new Corresponding(item.title,item.overview,item.vote_average,item.vote_count,'https://image.tmdb.org/t/p/w500'+item.poster_path,item.popularity,item.release_date)
      })
      console.log(mov);
      response.send(mov)
    } catch (error) {
        console.log(error);
        response.send(error)
    }
  }

  class Corresponding {
    constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date){
        this.title=title
        this.overview=overview
        this.vote_average=vote_average
        this.vote_count=vote_count
        this.poster_path=poster_path
        this.popularity=popularity 
        this.release_date=release_date 
    }
}

module.exports=getTheMovies