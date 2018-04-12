const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

////######### HBS SETUP ############/////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());

// GET
app.get('/', (req, res) => {
    res.render('home')
});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/')
	},
	filename:(req, file, cb) => {
		console.log(file);
		cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
	}
})


app.post('/api/uploads',(req, res) =>{

	// For single image upload

	/*const upload = multer({
		dest:'uploads/',
		limits:{fileSize:10000000},
		fileFilter:(req, file, cb) => {

			const ext = path.extname(file.originalname);
			if(ext !== '.jpg') {
				return cb(res.end('only jpg is allowed'), false);
			}
			cb(null, true);
		}
	}).single('image');*/

	// multiple image upload

	const upload = multer({
		// dest:'uploads/',
		storage,
		limits:{fileSize:10000000},
		fileFilter:(req, file, cb) => {

			const ext = path.extname(file.originalname);
			if(ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
				return cb(res.end('only jpg & png is allowed'), false);
			}
			cb(null, true);
		}
	}).fields([
		{name: 'image', maxCount: 2},
		{name: 'image2', maxCount: 10}
	]);
	
	upload(req, res, function(err) {
		if(err) {
			console.log(err)
			return res.status(400).end('error')
		}
		res.end('file uploaded');
	})


    res.status(200).send('OK');
})


app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});