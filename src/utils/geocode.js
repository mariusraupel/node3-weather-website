const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibGFiYXNrcmFiYXMiLCJhIjoiY2xsanE1NTRoMTF1ODNqbGl4OTM2eGM5YiJ9.pTgFK9M-MAp3BL_fckSGbg&limit=1`

    request({ url, json: true }, (error, {body}) => {
        if (error) callback('unable to connect to location services', undefined)
        else if (body.features.length === 0) {
            callback('cant find location', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode