//Importo express
const express = require('express');
const app = express();
const router = require('./routes/router');

app.use(express.static(__dirname + '/public/'));
app.use("/", router);

//Creo el servidor
app.listen('9000', function(err) {
  if (!err) {
      console.log('Server is running at port 9000');
  } else {
      console.log(JSON.stringify(err));
  }
});