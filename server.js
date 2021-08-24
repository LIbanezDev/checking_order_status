const express = require('express')
const app = express()
const port = 3000;
const axios = require('axios');
const apiUrl = process.env.API_URL;

app.get('/', async (req, res) => {
  const {data} = await axios.get(apiUrl);
  res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

exports.apiUrl = apiUrl;