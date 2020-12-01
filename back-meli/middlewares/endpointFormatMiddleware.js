let express = require('express');

const package = require('../package.json');
const getMeliApi = require('../controllers/buscadorController');
const { getMeliApiId, getMeliApiIdDescription, getProductCategory } = require('../controllers/idSearchController');
const { default: Axios } = require('axios');


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

const endpointBusqueda = async (query) => {    
    //response
    const searchResponse = await getMeliApi(query);
    

    //check req status of item
    //not found send status for error print
    if (searchResponse.status == 200 && searchResponse.data.paging.total == 0)
    {
        const statusReq = {
            "response" : {
                "status" : 404,
                "statusText" : "Not Found"
            }
        }    

        return statusReq;

    //if 404 send status
    }if (searchResponse.status == 404)
    {
        const statusReq = {
            "response" : {
                "status" : searchId.status,
                "statusText" : searchId.statusText
            }
        }    

        return statusReq;

    //found, sent to front
    }if(searchResponse.status == 200)
    {
        const infoSearch = searchResponse.data;

        //empty array for categories
        const categoriesRootArray = [];
        
        //get filter id
        const categoryFilter = infoSearch.filters.find(filter => filter.id === 'category');

        //get root categories group and push to empty array
        const categoriesGet = (categoryFilter) =>{
            categoryFilter ? categoryFilter.values[0].path_from_root.map(value => categoriesRootArray.push(value.name)) : undefined;
        }

        categoriesGet(categoryFilter);

        //empty array for items
        const itemsArray = [];

        const resultado = infoSearch.results;

        const itemSection = (resultado) => { 
            resultado.map(value => {

                const price = value.price;

                const currency = value.currency_id;                    

                const productSpecs = {
                    "id" : value.id,
                    "title" : value.title,
                    "price" : 
                        splitPrice(price, currency),
                    "picture" : value.thumbnail,
                    "condition" : value.condition,
                    "free_shipping" : value.shipping.free_shipping,
                    "city": value.address.state_name
                }   
                itemsArray.push(productSpecs);                          
            })
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
}

const endpointId = async (id) => {
    //response
    const searchId = await getMeliApiId(id);
    const searchDescription = await getMeliApiIdDescription(id);

    //check req status of item
    //not found send status for error print
    if (searchId.status == 404)
    {
        const statusReq = {
            "response" : {
                "status" : searchId.status,
                "statusText" : searchId.statusText
            }
        }    

        return statusReq;

    //found, sent to front
    }if(searchId.status || searchDescription.status == 200)
    {
        const resultadoId = searchId.data

        const categoryId = resultadoId.category_id;       

        const categoryName = await getProductCategory(categoryId);   
        
        const resultadoDescription = searchDescription.data;

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
            "description" : description,
            "category" : categoryName.data.name
        }
        
        const listadoPorId = {
            "author" : {
                "name" : firstName,
                "lastname" : lastName
            },
            item: productSpecs
        }    
        
        return listadoPorId;
    }
}

module.exports = { endpointBusqueda, endpointId };