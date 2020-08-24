const axios = require('axios');
const prompts = require('prompts');
const token = '9fe610fab2867e94b9b248c094c180a1';

const weather = async (city) => {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&lang=pt_br&units=metric`
  );
  const data = response.data;
  const weatherCurrent = data.weather[0];

  console.log({
    Cidade: data.name,
    Pais: data.sys.country,
    Tempo: weatherCurrent.main,
    Estado: weatherCurrent.description,
    Temperatura: data.main.temp,
  });
};

const getCity = async () => {
  const response = await prompts({
    type: 'text',
    name: 'city',
    message: 'Qual a cidade você quer saber o clima ?',
  });

  weather(response.city);
};

getCity();
