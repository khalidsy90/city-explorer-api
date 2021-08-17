const express=require('express');
const weatherJson=require('./data/weather.json')
const CORS=require('cors');

require('dotenv').config()

const server=express()
server.use(CORS())
const PORT=process.env.PORT


server.get('/',(request,response)=>{
    response.send('Welcome in my server')
})

server.get('/weather',(request,response)=>{
try {
    let city=weatherJson.find(item =>{
        let searchQuery=request.query.city
        return item.city_name.toLowerCase() === searchQuery.toLowerCase()  
        })

        let cityWeatherDays = city.data.map(day => {
            return new Forecast(day.datetime, `Low of ${day.low_temp} , High of ${day.max_temp} with  ${day.weather.description}`)
        });
        response.send(cityWeatherDays);
    } catch (error) {
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