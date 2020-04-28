'use strict';

const todoRoute = require('./../routes/todo-route');

module.exports = (app) => {
    todoRoute(app);
};
