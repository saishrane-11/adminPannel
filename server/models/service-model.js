const mongoose = require('mongoose');
const serviceSchema = mongoose.Schema({
    service:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true,
    },
    provider:{
        type:String,
        require:true,
    }
})

const Schema = new mongoose.model("Service", serviceSchema);
module.exports = Schema;