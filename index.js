const readline = require('readline');
const weather = require('./src/services/api')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function weatherInOtherCity() {
    await rl.question('Digite a Cidade :', (city) => weather(city))
}

weatherInOtherCity()