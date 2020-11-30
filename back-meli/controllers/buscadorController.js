let express = require('express');
const axios = require('axios');
const numberOfLimitResults = 4;

const getMeliApi =  async (query) => {
    try {
        const resp = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${numberOfLimitResults}`)
        return resp;
    } catch (err) {
        console.log(err)
        if(err.response.status === 404)
        return err.response
    }
}

//Exporto la ruta
module.exports = getMeliApi;