const validateObjectId = require('../middleware/validateObjectId');
const {SimCard, validate} = require('../models/simCard');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const simCards = await SimCard.find().sort('operator');
    res.send(simCards);
});

router.get('/:id', validateObjectId, async(req, res)=> {
    const simCard = await SimCard.findById(req.params.id);

    if(!simCard) return res.status(404).send('The simCard with the given ID was not found.');

    res.send(simCard);
});

router.post('/', async (req, res)=> {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let simCard = new SimCard({
        operator: req.body.operator,
        numberInStock: req.body.numberInStock
    });

    simCard = await simCard.save();

    res.send(simCard);
});

router.put('/:id',[validateObjectId], async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const simCard = await SimCard.findOneAndUpdate(req.params.id,
    {
        numberInStock: req.body.numberInStock
    }, { new: true });

    if(!simCard) return res.status(404).send('The simCard with the given ID was not found.');

    res.send(simCard);
});

router.delete('/:id', [validateObjectId], async(req, res) => {
    const simCard = await SimCard.findByIdAndRemove(req.params.id);

    if(!simCard) return res.status(404).send('The simCard with the given ID was not found.');

    res.send(simCard);
});

module.exports = router;
