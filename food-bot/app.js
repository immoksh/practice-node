const fs = require('fs');
const commandLineArgs = require('command-line-args');

const optionsDefinitions = [
	{name: 'name', type: String},
	{name: 'order', type: String},
	{name: 'payment', type: Number},
	{name: 'exit', type: Boolean}
];

const options = commandLineArgs(optionsDefinitions);
// console.log(options);

// 1 - node app.js
// 2 - node app.js --name=Setu
// 3 - node app.js --order=Sandwich
// 4 - node app.js --payment=50
// 5 - node app.js -- exit

let getJson = fs.readFileSync('db.json');
let data = JSON.parse(getJson);

const saveIt = (newData) =>{
	const toString = JSON.stringify(newData);
	fs.writeFileSync('db.json', toString);
}

if(options.name) {
	data.name = options.name;
	console.log(`Hello, ${options.name}, We are serving Pizza, Sandwich and Burger`);
	saveIt(data);
} else if(options.order) {
	data.order = options.order;
	console.log(`OK ${data.name}, that would be $20, you will pay with.....`);
	saveIt(data);
} else if(options.payment) {
	data.payment = options.payment;
	console.log(`Your change is ${options.payment - 20}, thanks for eating at MoMo\'s cafe type --exit to get the order`);
	saveIt(data);
} else if (options.exit) {
	console.log(data);
	console.log('Thanks');
	data.name = "";
	data.order = "";
	data.payment = "";

	saveIt(data);
} else {
	console.log('Hello, please enter your name');
}