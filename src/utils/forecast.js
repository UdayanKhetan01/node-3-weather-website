const request = require('request')

const forcast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=7b9f7711e52444ce212f7f24cdf9ca73&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) //+ '&units=f'
    request({ url, json: true }, (error, response) => {

        if (error) {
            callback('Can not connect to the weather api', undefined)
        }
        else if (response.body.error) {
            callback('Unable to find weather location', undefined)
        }
        else {

            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out and the humidity is ' + response.body.current.humidity + '%')
        }
    })
}
module.exports = forcast;