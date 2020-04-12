const readline = require('readline');
const http = require('http')

const token = '9fe610fab2867e94b9b248c094c180a1'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('digite a cidade  : ', (city) => {
   
        let searchCity = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}`
        
        http.get(searchCity, (data) => {
            
            data.setEncoding('utf8')
            let rawData = '';
            data.on('data', (chunk) => { rawData += chunk; })
            data.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData)
                    console.log(parsedData)

                } catch (e) {
                    console.error(e.message)
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`)
            

        });


})

