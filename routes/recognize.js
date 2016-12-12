var express = require('express');
var router = express.Router();
var multer  = require('multer');
var neuronModel = require('../models/neuron');

const neuron = neuronModel.neuron;
const normalize = neuronModel.normalize;

/* GET home page. */
router.post('/', multer().array(), function(req, res, next) {
    const data =  [
            parseInt(req.body.a1),
            parseInt(req.body.a2),
            parseInt(req.body.a3)
        ];
    const normal = normalize(data);

    try {
        const result = neuron.recognize(normal);
    } catch (e) {
        res.status(500).send('Neuron recognize trouble =(')
    }

    res.end(JSON.stringify([data, result]));
});

module.exports = router;
