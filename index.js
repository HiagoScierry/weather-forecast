const readline = require('readline');
const http = require('http')

const token = '9fe610fab2867e94b9b248c094c180a1'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


 function verifyWeather(city) {

    let searchCity = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&lang=pt_br&units=metric`
    
    http.get(searchCity, (data) => {

        data.setEncoding('utf8')
        let rawData = '';
        data.on('data', (chunk) => { rawData += chunk; })
        data.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData)
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


 function weatherInOtherCity() {
    rl.question('Digite a Cidade :', (city) => {
        
       verifyWeather(city)
        
    })
}

 function  favorityCity(){
    let citys = ["Alegre", "Linhares", "São Mateus", "Vitoria"]
    for (let i = 0; i < citys.length; i++) {
        verifyWeather(citys[i])
       
        
    }

}


// Init

favorityCity()