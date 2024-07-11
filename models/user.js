const mongooose = require('mongoose')
const userschema = new mongooose.Schema({
    "name": {
        type: String,
        required: true,
        index:true
    },
    "password": {
        type: String,
        required: true
    },
})

// mongooose.model('User', userschema)

module.exports = mongooose.model('User',userschema)