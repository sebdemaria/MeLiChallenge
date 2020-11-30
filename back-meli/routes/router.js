const express = require('express');
const router = express.Router();

let {endpointBusqueda, endpointId} = require("../middlewares/endpointFormatMiddleware");

router.get('/items', async (req, res) => {
    if(req.query.q === undefined){
        res.sendStatus(400).json("Bad request")
    }else{
    const query = JSON.stringify(req.query.q);
    const search = await endpointBusqueda(query);
    res.send(search);
    }
});

router.get('/items/:id', async (req, res) => {
    if(req.params.id === undefined){
        res.sendStatus(400).json("Bad request")
    }else{
    const id = req.params.id;
    const idSearch = await endpointId(id);
    res.send(idSearch);
    }
});


module.exports = router;