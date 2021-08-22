'use strict'
const axios=require('axios')
// const memorization = require('./memorization')
const memoriz=[];
const getTheMovies=async(request,response)=>{
    try {
      let city=request.query.query
      if(!memoriz[city]){
        let result=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`)
        let mov=result.data.results.map(item =>{
            return new Corresponding(item.title,item.overview,item.vote_average,item.vote_count,item.poster_path,item.popularity,item.release_date)
        })
        response.send(mov)
        memoriz[city]=result.data.results
        console.log("from API movies");
      }
      else{
          response.send(memoriz[city])
          console.log('from object movies');
      }
     
    } catch (error) {
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