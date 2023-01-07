const { Schema, model } = require('mongoose');


const shelterSchema = new Schema ({
    shelterId:{
        type: String,
        unique: true,
    },
    provider:{
        type: String,
    },
    address:{
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type:String,
    },
    numberOfBeds:{
        type: Number,
    },
    web_url:{
        type:String,
    }

});

const Shelters = model('Shelters', shelterSchema);

module.exports = Shelters;