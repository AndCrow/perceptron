'use strict'

class Neuron {
    constructor(paramsCount, activationFunction, learnSpeed = 0.9, learnPrecision = 0.01) {
        //init weights
        this.weights = [];
        for (let i = 0; i < paramsCount; i++) {
            let max = 1;
            let min = -1;
            const randWeight = 0.01 * Math.floor(Math.random() * (1 - (-1) + 1)) + min;
            this.weights.push(randWeight);
        }

        //activation function
        const defaultActivation = function(x) {
            return 2 / (1 + Math.exp(-2 * x)) - 1;
        }
        this.activation = activationFunction || defaultActivation;

        this.learnPrecision = learnPrecision;
        this.learnSpeed = learnSpeed;
    }

    teach(dataArr, rezult) {
        const activated = this.recognize(dataArr);
        const diff = rezult - activated;

        //teach neuron: change weights
        this.weights = this.weights.map( (elem, i) => {
            return elem + this.learnSpeed * diff * dataArr[i];
        });

        //return infelicity
        return diff;
    }

    recognize(dataArr) {
        const sum = dataArr.reduce( (prev, elem, i) => {
            return prev + elem * this.weights[i];
        }, 0);

        return this.activation(sum);
    }
}

module.exports = Neuron;
