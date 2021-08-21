const axios = require('axios');

const getTheWeather=async(request,response)=>{
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
}

class Shape{
    constructor(date,desc){
        this.date=date
        this.desc=desc
    }
}

module.exports=getTheWeather