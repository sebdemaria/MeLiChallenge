let express = require('express');
const axios = require('axios');

let getMeliApi =  async (req, res) => {
    await axios.get('https://api.mercadolibre.com/sites/MLA/')
    .then( res => {
        console.log(res.data)
    }).catch((error => {
        console.log(error);
    }));
}


// let listController = {
//     index: (req, res) => {
//         res.send('Hola manola');
//     },  

//     identificacion: (req, res) => {
//         let idProd = req.params.id;
//         res.send('Hola cami ' + idProd);
//     },  
// };

//Exporto la ruta para poder compartirlo con index.js
module.exports = getMeliApi;