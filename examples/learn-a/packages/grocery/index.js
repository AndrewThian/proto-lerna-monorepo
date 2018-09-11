const sillyname = require('sillyname');
const apple = require('apple');
const banana = require('banana');

console.log(`grocery and ${sillyname()}`);
console.log(apple.name, apple.uuid);
console.log(banana.name, banana.uuid);

const total = banana.number + apple.number

console.log(`Total price: ${total}`)