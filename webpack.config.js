const path = require('path');

module.exports = {
    entry : path.join(__dirname, '/src/index.js'),
    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'bundle.js'
    },
    module : {
        rules : [{
            loader : 'babel-loader',
            test : /\.js$/,
            exclude : /node_modules/
        }, {
            test : /\.scss$/,
            use : [
                'style-loader', 'css-loader', 'sas-loader'
            ]
        }]
    }

}