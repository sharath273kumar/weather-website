const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server 
app.use(express.static(publicPath))

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Sharath Kumar'
    })
})

app.get('/weather', (request, response) => {
    if(!request.query.address){
        return response.send({
            errorMessage: 'Address is a mandatory field'
        })
    }

    geoCode(request.query.address, (error, locationData = {}) => {
        if(error)
           return response.send({ error })
           
        foreCast(locationData.latitude, locationData.longitude, (error, forecastData)=>{
            console.log('It is currectly ', locationData.temperature, 'degrees with', locationData.description)
            if(error)
                return response.send({ error })
            
                response.send({
                    forecastData: forecastData,
                    place: locationData.place_name
                })
        })
    })

})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        name: 'Sharath Kumar'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        name: 'Sharath Kumar'
    })
})

app.get('/products', (request, response) => {
    response.send({
        products: []
    })
})

app.get('*', (request, response) => {
    response.render('404', {
        errorMessage: 'Page not Found. Try something else',
        title: '404 Page',
        name: 'Sharath Kumar'
    })
})

app.listen(port, () => {
    console.log('Server started and listening on ' + port)
})