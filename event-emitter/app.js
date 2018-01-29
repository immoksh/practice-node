const events = require('events');
const eventEmitter = new events.EventEmitter();

const ringBell = () => {
	console.log('ring ring ring');
}

eventEmitter.on('guestHere', ringBell);

//////////////////////

const sayHello = () => {
	console.log(`Hello who's there?`);
}

eventEmitter.on('guestHere', sayHello);

/////////////////////

eventEmitter.on('guestHere',(action) => {
	console.log(action);
});

/////////////////////
eventEmitter.emit('guestHere','Its me your guest');

