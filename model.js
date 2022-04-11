const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PersonSchema = new Schema({
    contact: {type: String,required:true},
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    gender: {type: String},
    app: {type:String}
},{ collection: 'person' });



const Person = mongoose.model('Person', PersonSchema);


module.exports = {Person}