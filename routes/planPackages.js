const validateObjectId = require('../middleware/validateObjectId');
const {PlanPackage, validate} = require('../models/planPackage');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const planPackages = await PlanPackage.find().sort('name');
    res.send(planPackages);
});

router.get('/:id', validateObjectId, async(req, res)=> {
    const planpackage = await PlanPackage.findById(req.params.id);

    if(!planpackage) return res.status(404).send('The planpackage with the given ID was not found.');

    res.send(planpackage);
});

router.post('/', async (req, res)=> {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let planpackage = new PlanPackage({
        name: req.body.name,
        value: req.body.value,
        navigation: req.body.navigation,
        navigationDescription: req.body.navigationDescription,
        minutes: req.body.minutes
    });

    planpackage = await planpackage.save();

    res.send(planpackage);
});

router.put('/:id',[validateObjectId], async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const planpackage = await PlanPackage.findOneAndUpdate(req.params.id,
    {
        name: req.body.name,
        value: req.body.value,
        navigation: req.body.navigation,
        navigationDescription: req.body.navigationDescription,
        minutes: req.body.minutes
    }, { new: true });

    if(!planpackage) return res.status(404).send('The planpackage with the given ID was not found.');

    res.send(planpackage);
});

router.delete('/:id', [validateObjectId], async(req, res) => {
    const planpackage = await PlanPackage.findByIdAndRemove(req.params.id);

    if(!planpackage) return res.status(404).send('The planpackage with the given ID was not found.');

    res.send(planpackage);
});

module.exports = router;