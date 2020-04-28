'use strict';

const comboService = require('../services/combo-service');

/**
 * Sets response for combo search.
 *
 * @param request
 * @param response
 */
exports.list = (request, response) => {
    // According to title, search the result
    const titleQuery = request.query.title;
    const params = {};
    if(titleQuery) {
        params.title = titleQuery
    }
    const promise = comboService.search(params);
    const result = (combos) => {
        response.status(200);
        response.json(combos);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new combo and sets the response.
 *
 * @param request
 * @param response
 */
exports.save = (request, response) => {
    const combo = Object.assign({}, request.body);
    const result = (savedCombo) => {
        response.status(201);
        response.json(savedCombo);
    };
    const promise = comboService.save(combo);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Returns combo response.
 *
 * @param request
 * @param response
 */
exports.get = (request, response) => {
    const comboId = request.params.id;
    const result = (combo) => {
        response.status(200);
        response.json(combo);
    };
    const promise = comboService.get(comboId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Updates the combo resource.
 *
 * @param request
 * @param response
 */
exports.update = (request, response) => {
    const comboId = request.params.id;
    const updatedCombo = Object.assign({}, request.body);
    updatedCombo.id = comboId;
    const result = (combo) => {
        response.status(200);
        response.json(combo);
    };
    const promise = comboService.update(updatedCombo);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes an combo resource.
 *
 * @param request
 * @param response
 */
exports.delete = (request, response) => {
    const comboId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "Successfully Deleted."
        });
    };
    const promise = comboService.delete(comboId);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(404);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};
