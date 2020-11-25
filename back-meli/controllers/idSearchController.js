let express = require('express');
const axios = require('axios');

const getMeliApiId =  async (req, res) => {
    try {
        const resp = await axios.get('https://api.mercadolibre.com/items/MLA837480456')
            return resp.data
    } catch (err) {
        console.error(err)
    }
}

const getMeliApiIdDescription =  async (req, res) => {
    try {
        const resp = await axios.get('https://api.mercadolibre.com/items/MLA837480456/description')
            return resp.data
    } catch (err) {
        console.error(err)
    }
}

//Exporto la ruta
module.exports = { getMeliApiId, getMeliApiIdDescription};