const path = require('path')
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

// console.log(__dirname)//To get the path
// console.log(path.join(__dirname, '../public'))//To get the desired path

//To define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs')//To set up handlebars npm i hbs@4.2.0
app.set('views', viewsPath);//If we change the name of view directory to template.Default is automatically set to views directory
hbs.registerPartials(partialPath)//To set up partials path


//Setup static directory to serve
app.use(express.static(publicDirPath))//it uses this path to get static pages


//To render views
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Udayan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Udayan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is help page",
        title: 'Help',
        name: 'Udayan'
    })

})



//To work with query strings

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'Please prrovide search term'
        })
    }

    console.log(req.query.search)
    res.send({ products: [] })
})



// app.get('', (req, res) => {
//     res.send('<h1>Hello express!!</h1>')
// })
// app.get('/help', (req, res) => {
//     res.send([{ name: 'udayan' }, { age: 20 }])
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>about page</h1>')
// })
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, foreCastdata) => {
            if (error) {

                return res.send({ error })
            }
            res.send({
                forecast: foreCastdata,
                location,
                address: req.query.address
            })
        })
    })



})


// res.send({
//     forecast: 'rain',
//     location: 'Philidelphia',
//     address: req.query.address
// })

//app.com
//app.com/help
//app.com/about


//To show error message if some wrong url is provided
app.get('/help/*', (req, res) => {

    res.render('404', {
        title: 404,
        name: 'Udayan',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {

    res.render('404', {
        title: 404,
        name: 'Udayan',
        errorMessage: 'Page not found'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})