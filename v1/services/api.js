const http = require('http')
const token = '9fe610fab2867e94b9b248c094c180a1'


module.exports = async function verifyWeather(city) {

    let searchCity = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&lang=pt_br&units=metric`
    
     await http.get(searchCity, (data) => {

        data.setEncoding('utf8')
        let rawData = '';3
        data.on('data', (chunk) => { rawData += chunk; })
        data.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData)//console.log(weather(city))

                const weatherCurrent = parsedData.weather[0]
                
                const information = {
                    "Cidade": parsedData.name,
                    "Pais": parsedData.sys.country,
                    "Tempo": weatherCurrent.main,
                    "Estado": weatherCurrent.description,
                    "Temperatura": parsedData.main.temp,
                }

                console.log(information)

                
            } catch (e) {
                console.error(e.message)
            }
        })
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`)
        
    })
    
}
