const express = require('express');
const router = express.Router();

let {endpointBusqueda, endpointId} = require("../middlewares/endpointFormatMiddleware");

router.get("/items/search/", async (req, res) => {
    const search = await endpointBusqueda();
    res.send(search);
});
router.get("/items/", async (req, res) => {
    const idSearch = await endpointId();
    res.send(idSearch);
});

// router.get("/api/items?q=​:query", )

module.exports = router;