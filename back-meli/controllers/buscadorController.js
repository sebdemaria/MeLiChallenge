let express = require('express');
const axios = require('axios');
const numberOfLimitResults = 4;

const getMeliApi =  async (req, res) => {
    try {
        const resp = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6&limit=${numberOfLimitResults}`)
            return resp.data
    } catch (err) {
        console.error(err)
    }
}

//Exporto la ruta
module.exports = getMeliApi;