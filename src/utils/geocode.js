const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidWRheWFua2hldGFuIiwiYSI6ImNsN2FpamZ4dDAxejgzcXNkaWc1aDB1OHMifQ.ZS5U-BCIsMf54XzDaWIKew&limit=1'
    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback(
                'Can not connect to the geocode api',
                undefined
            )
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location',
                undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })

        }
    })
}

module.exports = geocode;