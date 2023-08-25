const request = require('postman-request')



const geocode = (longitude, latitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=33f977b21aec5a9cc7d6ddc4559782a4&query=${latitude},${longitude}&units=m`


    request({  url, json: true }, (error, {body}) => {

        if (error) callback('unable to connect to weather services');

        else if (body.error) callback('cant find location')
        else {
            const string = `it is currently ${body.current.temperature} degrees out 
            in ${body.location.name}. 
            It feels like it is ${body.current.feelslike} degrees out`
            callback(undefined, string);
        }
    })

}



module.exports = geocode