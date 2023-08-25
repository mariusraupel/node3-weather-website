const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')
app.set('views', viewsPath)

console.log(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Marius R.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Marius R.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'help title',
        name: ' marius r.'
    })
})


app.get('/weather', (req, appResponse) => {

    const locationAddress = req.query.address
    if (!locationAddress) return appResponse.send({ error: 'you must provide an adress' })

    geocode(locationAddress, (error,{longitude, latitude,location}={})=>{
        if (error) return appResponse.send({error})

        forecast(longitude, latitude, (req, forecastResponse)=>{
            
            appResponse.send({
                forecast: forecastResponse,
                longitude,
                latitude,
               location
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) return res.send({ error: 'you must provide a search term' })
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Marius',
        errorMessage: 'help error'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Marius',
        errorMessage: 'all other problems title'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})