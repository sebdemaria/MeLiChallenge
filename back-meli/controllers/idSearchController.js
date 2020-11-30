let express = require('express');
const axios = require('axios');

const getMeliApiId =  async (id) => {
    try {
        const resp = await axios.get(`https://api.mercadolibre.com/items/${id}`)
        if(resp.status === 200)
            return resp;
    } catch (err) {
        console.log(err)
        if(err.response.status === 404)
        return err.response
    }
}

const getMeliApiIdDescription =  async (id) => {
    try {
        const resp = await axios.get(`https://api.mercadolibre.com/items/${id}/description`)
        if(resp.status === 200)
            return resp;
    } catch (err) {
        console.log(err)
        if(err.response.status === 404)
        return err.response
    }
}

const getProductCategory =  async (category_id) => {
    try {
        const resp = await axios.get(`https://api.mercadolibre.com/categories/${category_id}`)
        if(resp.status === 200)
            return resp;
    } catch (err) {
        console.log(err)
        if(err.response.status === 404)
        return err.response
    }
}

//Exporto la ruta
module.exports = { getMeliApiId, getMeliApiIdDescription, getProductCategory };