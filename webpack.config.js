const path = require('path');

module.exports = {
    entry: './src/calculator.js',
    output: {
        filename: 'calculator.js',
        path: path.resolve(__dirname, 'dist'),
    },
};