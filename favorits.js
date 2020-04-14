const weather = require('./src/services/api')


const citys = ["Alegre", "Linhares", "São Mateus", "Vitoria"]


async function favorityCity() {
    for (let i = 0; i < citys.length; i++) {
         await weather(citys[i])
        

    }
}


favorityCity()