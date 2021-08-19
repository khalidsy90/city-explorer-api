const express=require('express');
const weatherJson=require('./data/weather.json')
const CORS=require('cors');
const axios=require('axios')
require('dotenv').config()


const server=express()
server.use(CORS())
const PORT=process.env.PORT


server.get('/',(request,response)=>{
    response.send('Welcome in my server')
})
//localhost:3001/weather
server.get('/weather',async(request,response)=>{
    try {
        let city=request.query.city
        let url=await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${city}`)
        let shapeArray= url.data.data.map(day =>{
            return new Shape(day.datetime, `Low of ${day.low_temp} , High of ${day.max_temp} with  ${day.weather.description}`)
        })
        response.send(shapeArray)
       
    } 
    catch (error) {
        response.send(error)
    }
    // let city=weatherJson.find(item =>{
    //     let searchQuery=request.query.city
    //     return item.city_name.toLowerCase() === searchQuery.toLowerCase()  
    //     })

    //     let cityWeatherDays = city.data.map(day => {
    //         return new Forecast(day.datetime, `Low of ${day.low_temp} , High of ${day.max_temp} with  ${day.weather.description}`)
    //     });
    //     response.send(cityWeatherDays);
    // } catch (error) {
    //     response.send(error)
    // }
})
 

server.get('/movies', async (request,response)=>{
  try {
    let city=request.query.query
    //https://api.themoviedb.org/3/search/movie?api_key=${process.env.THE_MOVIE_DB_API_KEY}&query=${city}
    // let result=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`)

    let result=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`)
    let mov=result.data.results.map(item =>{
        //title,overview,vote_average,vote_count,poster_path,popularity,release_date
        return new Corresponding(item.title,item.overview,item.vote_average,item.vote_count,'https://image.tmdb.org/t/p/w500'+item.poster_path,item.popularity,item.release_date)
    })
    console.log(mov);
    response.send(mov)
  } catch (error) {
      console.log(error);
      response.send(error)
  }
})


server.get('*',(req,res)=>{
    res.status(500).send("!something wrong.")
})

server.listen(process.env.PORT,() =>{
    console.log('it is ok');
})

class Forecast{
    constructor(date,description){
        this.date=date
        this.description=description
    }
}
class Shape{
    constructor(date,desc){
        this.date=date
        this.desc=desc
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