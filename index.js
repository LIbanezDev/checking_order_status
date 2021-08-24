require('dotenv').config();
require('./server');
const {apiUrl} = require('./server')
const axios = require('axios');
const { clearInterval } = require('timers');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const originNumber = process.env.TWILIO_NUMBER;
const destinationNumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);


const mainLoop = setInterval( async () => {
    const {data} = await axios.get(apiUrl);
    console.log(data.status_history.length)
    if (data.status_history.length > 7) {
        const resp = await client.messages
            .create({
                body: `El pedido cambio de estado a: ${data.status}!!!`,
                from: originNumber,
                to: destinationNumber
            })
        clearInterval(mainLoop);
    }
}, 60000);

