const request = require('request')

const getGeoCode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1Ijoic2hhcmF0aDI3M2t1bWFyIiwiYSI6ImNrZGEyaW1nNDExNHkyeW5uM2lpMTZzeHgifQ.-Jl9ZMBmXTN__g9DvejUcA&limit=1'

    request({url: geoUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location Services', undefined)
        } else if (response.body.features.length <= 0){
            callback('Unable to find Location, try another Search', undefined)
        } else{  
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place_name: response.body.features[0].place_name
            })
        }
    })
}

module.exports = getGeoCode