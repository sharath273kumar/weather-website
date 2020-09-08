const request = require('request')

const getForecast = (latitude, longitude, callback) =>{
    const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + 
    '&lon=' + longitude + '&units=metric&appid=b4f6b234dac7d67322298e9feb87d4e4'

    console.log(forecastUrl)
    request({url: forecastUrl, json: true}, (error, response) => {
        if(error){
            callback('Forecast Services are not available')
        } else if(response.body.error){
            callback('Forcast not available for this location, Try something else')
        } else{
            callback(undefined, {
                description: 'It is currently ' + response.body.list[0].main.temp + ' degrees out, with ' + response.body.list[0].weather[0].description,
                temperature: response.body.list[0].main.temp
            })
        }
    })
}

module.exports = getForecast