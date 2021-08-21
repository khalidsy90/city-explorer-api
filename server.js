const express=require('express');
const weatherJson=require('./data/weather.json')
const CORS=require('cors');
const axios=require('axios')
require('dotenv').config()
const getTheWeather=require('./data/Modules/weather.js')
const getTheMovies=require('./data/Modules/Movies.js')

const server=express()
server.use(CORS())
const PORT=process.env.PORT


server.get('/',(request,response)=>{
    response.send('Welcome in my server')
})
//localhost:3001/weather
server.get('/weather',getTheWeather)

//localhost:3001/movies
server.get('/movies',getTheMovies ) 


server.get('*',(req,res)=>{
    res.status(500).send("!something wrong.")
})

server.listen(process.env.PORT,() =>{
    console.log('it is ok');
})
