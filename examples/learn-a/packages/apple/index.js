const sillyname = require("sillyname")
const uuid = require("uuid/v1")
const rn = require('random-number');

module.exports = {
    name: `apple and ${sillyname()}`,
    uuid: uuid(),
    number: rn()
}