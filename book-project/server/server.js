const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

// DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/book_db');

const {Book} = require('./models/books');
const {Store} = require('./models/stores');

//POST
app.post('/api/add/store',(req, res) => {
	const store = new Store({
		name: req.body.name,
		address: req.body.address,
		phone: req.body.phone
	});

	store.save((err, doc) => {
		if(err) res.status(400).send(err);
		res.status(200).send();
	})
})

app.post('/api/add/books', (req, res) => {
	const book = new Book({
		name: req.body.name,
		author: req.body.author,
		pages: req.body.pages,
		price: req.body.price,
		stores: req.body.stores,
	});

	book.save((err, doc) => {
		if(err) res.status(400).send(err);
		res.status(200).send();
	})
})

//GET
app.get('/api/stores',(req, res) => {
	Store.find((err, doc) => {
		if(err) res.status(400).send(err);
		res.send(doc);
	})	
})

app.get('/api/books', (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 10;
	let sort = req.query.ord ? req.query.ord : 'asc';

	Book.find().limit(limit).sort({_id:sort}).exec((err, doc) => {
		if(err) res.status(400).send(err);
		res.send(doc);
	})
})

app.get('/api/books/:id', (req, res) => {
	Book.findById(req.params.id, (err, doc) => {
		if(err) res.status(400).send(err);
		res.send(doc);
	})
})


//PATCH
app.patch('/api/books/:id', (req, res) => {
	console.log(req.params.id);
	Book.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true}, (err, doc) => {
		if(err) res.status(400).send(err);
		res.send(doc);
	})
})

// DELTE
app.delete('/api/books/:id', (req, res) => {
	Book.findByIdAndRemove(req.params.id,(err, doc) => {
		if(err) res.status(400).send(err);
		res.status(200).send();
	})
})


const port = process.env.PORT || 3000;
app.listen(port,()=>{
	console.log(`Started at port ${port}`)
})