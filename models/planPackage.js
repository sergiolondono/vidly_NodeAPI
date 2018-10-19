const Joi = require('joi');
const mongoose = require('mongoose');

const PlanPackage = mongoose.model('planPackage', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    navigation: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    navigationDescription: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    minutes: {
        type: Number,
        required: true,
        min: 0
    }
}));

function validatePlanPackage(planPackage){
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        value: Joi.number().min(0).required(),
        navigation: Joi.string().min(5).max(50).required(),
        navigationDescription: Joi.string().min(5).max(255).required(),
        minutes: Joi.number().min(0).required()
    };

    return Joi.validate(planPackage, schema);
}

exports.PlanPackage = PlanPackage;
exports.validate = validatePlanPackage;