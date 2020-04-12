const readline = require('readline');
const http = require('http')

const token = '738158a37662859f599f4108160f2e04'

//let wetherIn15days = `curl -i http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${data.id}/days/15?token=${token}`


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('digite a cidade  : ', (city) => {
    rl.question('digite o estado : ', (state) => {
        let searchCity = `http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${city}&state=${state}&token=${token}`
        
        http.get(searchCity, (data) => {
            
            data.setEncoding('utf8')
            let rawData = '';
            data.on('data', (chunk) => { rawData += chunk; })
            data.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData)
                    console.log(parsedData)
                    const dataCity = parsedData[0]
                    const id  = dataCity.id
                    console.log(id)


                    let wetherCurrent = `http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${id}/current?token=${token}`
                    
                    http.get(wetherCurrent, (res) => {
            
                        res.setEncoding('utf8')
                        let rawData = '';
                        res.on('data', (chunk) => { rawData += chunk; })
                        res.on('end', () => {
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

                } catch (e) {
                    console.error(e.message)
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`)
            

        });

    })

})

