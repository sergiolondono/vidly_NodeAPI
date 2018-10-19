const Joi = require('joi');
const mongoose = require('mongoose');

const SimCard = mongoose.model('SimCard', new mongoose.Schema({
    operator:{
        type: String,
        default: "Flash"
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0
    }
}));

function validateSimCard(simcard) {
    const schema = {
        operator: Joi.string(),
        numberInStock: Joi.number().min(0).required()      
    };
  
    return Joi.validate(simcard, schema);
  }
  
  exports.SimCard = SimCard; 
  exports.validate = validateSimCard;