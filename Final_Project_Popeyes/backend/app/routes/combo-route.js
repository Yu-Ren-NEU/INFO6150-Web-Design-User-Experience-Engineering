'use strict';

const comboController = require('../controllers/combo-controller');

module.exports = (app) => {
    app.route('/combos')
        .get(comboController.list)
        .post(comboController.save);

    app.route('/combos/:id')
        .get(comboController.get)
        .put(comboController.update)
        .delete(comboController.delete);
};
