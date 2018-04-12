const express = require('express');
const formidable = require('express-formidable');
const hbs = require('express-handlebars');
const path = require('path');
const cloudinary = require('cloudinary');
const multer = require('multer');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

cloudinary.config({ 
  cloud_name: 'setumodi', 
  api_key: '295469893742799', 
  api_secret: 'ts8PQwwcyDeC9b3B3pGv4YTQ5x8' 
});


const app = express();

////######### HBS SETUP ############/////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(formidable({
	multiple: true
}));

// GET
app.get('/', (req, res) => {
    res.render('home')
});

app.post('/api/uploads',(req, res) =>{

	// console.log(req.files);
	// console.log(req.fields);
	cloudinary.uploader.upload(req.files.image.path,(result)=>{
		console.log(result)
    	res.status(200).send('OK');
	},{
		public_id: `${Date.now()}_${path.parse(req.files.image.name)}`,
		resource_type: 'auto'
	});


})


app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});