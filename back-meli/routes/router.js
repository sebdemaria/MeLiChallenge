const express = require('express');
const router = express.Router();

let {endpointBusqueda, endpointId} = require("../middlewares/endpointFormatMiddleware");

router.get("/api/items?q=", endpointBusqueda);
router.get("/api/items/", endpointId);

// router.get("/api/items?q=​:query", )

module.exports = router;