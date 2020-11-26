let express = require('express');

const package = require('../package.json');
const getMeliApi = require('../controllers/buscadorController');
const { getMeliApiId, getMeliApiIdDescription } = require('../controllers/idSearchController');


//Create author name variables
const authorFullName = package.author.split(" ")
const firstName = authorFullName[0];
const lastName = authorFullName[1];

//function for price section of endpoint
const splitPrice = (price, currency) => {
    let priceArray = price.toString().split(".");
    return {
        currency : currency,
        amount : priceArray[0],
        decimal : (!priceArray[1] === undefined) ? '00' : priceArray[1]
    }
}

const endpointBusqueda = async () => {
    //response
    const infoSearch = await getMeliApi();
    
    //empty array for categories
    const categoriesRootArray = [];
    
    //get filter id
    const categoryFilter = infoSearch.filters.find(filter => filter.id === 'category');

    //get root categories group and push to empty array
    const categoriesGet = categoryFilter.values[0].path_from_root.map(value => categoriesRootArray.push(value.name));

    //empty array for items
    const itemsArray = [];

    const resultado = infoSearch.results.map(value => value);

    const itemSection = (resultado) => {
        for (i = 0; i < resultado.length; i++){

            const price = resultado[i].price;

            const currency = resultado[i].currency_id;                    

            const productSpecs = {
                "id" : resultado[i].id,
                "title" : resultado[i].title,
                "price" : 
                    splitPrice(price, currency),
                "picture" : resultado[i].thumbnail,
                "condition" : resultado[i].condition,
                "free_shipping" : resultado[i].shipping.free_shipping
            }   
            itemsArray.push(productSpecs);                          
        }
    }

    itemSection(resultado);

    const listadoPorSearch = {
        "author" : {
            "name" : firstName,
            "lastname" : lastName
        },
        categories: categoriesRootArray,
        items: itemsArray
    }    
    return listadoPorSearch;
}

const endpointId = async () => {
    //response
    const resultadoId = await getMeliApiId();
    const resultadoDescription = await getMeliApiIdDescription();

    const description = resultadoDescription.plain_text;

    const price = resultadoId.price;

    const currency = resultadoId.currency_id;                    

    const productSpecs = {
        "id" : resultadoId.id,
        "title" : resultadoId.title,
        "price" : 
            splitPrice(price, currency),
        "picture" : resultadoId.thumbnail,
        "condition" : resultadoId.condition,
        "free_shipping" : resultadoId.shipping.free_shipping,
        "sold_quantity" : resultadoId.sold_quantity,
        "description" : description
    }   

    const listadoPorId = {
        "author" : {
            "name" : firstName,
            "lastname" : lastName
        },
        item: productSpecs
    }    

    return listadoPorId;
    // console.log(listadoPorId)
}

module.exports = { endpointBusqueda, endpointId };