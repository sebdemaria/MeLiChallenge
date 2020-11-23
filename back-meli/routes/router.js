const express = require('express');
const router = express.Router();

let buscadorController = require("../controllers/buscadorController");

router.get("/", buscadorController);

module.exports = router;