const express = require('express');
const hbs = require('express-handlebars');
const app = express();

app.engine('hbs',hbs({extname:'hbs'}));
app.set('view engine', 'hbs');

app.use("/css", express.static(__dirname + '/public/css')); 


const port = process.env.PORT || 3000;
app.listen(port);