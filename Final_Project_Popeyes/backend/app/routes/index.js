'use strict';

const comboRoute = require('./combo-route');
const userRoute = require('./user-route');

module.exports = (app) => {
    comboRoute(app);
    userRoute(app);
};
