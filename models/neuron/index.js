'use strict'
const fs = require('fs');
const Neuron = require('./neuron')

// read data
const data = readJsonFile(__dirname + '/data.json');

const min = data.min.input;
const max = data.max.input;
const dataset = data.dataset;

exports.neuron = prepareneuron();

//create and teach neuron
function prepareneuron(prec = 0.1, maxIter = 5000) {
    const paramsCount = dataset[0].input.length;
    const neuron = new Neuron(paramsCount);

    let err = 1;
    let counter = 0;

    //teach
    while (err > prec && counter < maxIter) {
        err = 0;
        let learnArr = shuffleArray(dataset.slice());

        for (let i in learnArr) {
            let normalized = normalize(learnArr[i].input, min, max)
            let teachInfelicity = neuron.teach(normalized, learnArr[i].output);
            err += Math.pow(teachInfelicity, 2);
        }

        err = err / 2;
        counter++;
    }

    if (counter == maxIter) {
        console.warn('Learn iteration limit reached!');
    }

    return neuron;
}

function readJsonFile(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function shuffleArray(array) {
    let i = array.length;
    let j, t;

    while (i) {
        j = Math.floor( ( i-- ) * Math.random() );
        t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
    return array;
}

function normalize(dataArr, min, max) {
    let newData = [];
    let i = 0;
    for (i = 0; i < dataArr.length; i++) {
        newData[i] = (dataArr[i] - min[i]) / (max[i] - min[i]);
    }

    return newData;
}

//bind context to function
exports.normalize = (dataArr) => normalize(dataArr, min, max);
