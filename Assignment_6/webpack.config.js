const path = require('path');

module.exports = {
    entry: './JS/main.js',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js', '.tsx' ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    }
};
