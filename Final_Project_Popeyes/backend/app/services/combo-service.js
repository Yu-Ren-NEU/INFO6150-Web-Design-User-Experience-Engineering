'use strict';
const mongoose = require('mongoose'),
    Combo = mongoose.model('combo');

/**
 * Returns a promise for search results.
 *
 * @param search param.
 */
exports.search = (params) => {
    // promise = {name=""}
    const promise = Combo.find(params).exec();
    return promise;
};

/**
 * Saves the new combo object.
 *
 * @param combo
 */
exports.save = (combo) => {
    const newCombo = new Combo(combo);
    let time = new Date();
    newCombo.Createdtime = time.toLocaleString();
    return newCombo.save();
};

/**
 * Returns the combo object by id.
 *
 * @param comboId
 */
exports.get = (comboId) => {
    const comboPromise = Combo.findById(comboId).exec();
    return comboPromise;
};

/**
 * Updates an existing combo.
 *
 * @param updatedCombo
 */
exports.update = (updatedCombo) => {
    const promise = Combo.findByIdAndUpdate(updatedCombo.id, updatedCombo).exec();
    return promise;
};

/**
 * Deletes an existing combo.
 *
 * @param comboId
 */
exports.delete = (comboId) => {
    const promise = Combo.findByIdAndRemove(comboId).exec();
    return promise;
};
