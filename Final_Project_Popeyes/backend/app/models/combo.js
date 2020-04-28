'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for combo object.
 */
let ComboSchema = new Schema({
        Title: {
            type: String,
            required: "Title is missing"
        },
        Description: {
            type: String
        },
        Main: {
            type: String,
            required: "Main is missing"
        },
        Side: {
            type: String
        },
        Sauce: {
            type: String
        },
        Drink: {
            type: String
        },
        Label: {
            type: String
        },
        // This is creating combo user's Username.
        Owner: {
            type: String,
            required: "Owner is missing"
        },
        // This is creating combo user's Mail.
        Ownermail: {
            type: String
        },
        Createdtime: {
            type: Date
        },
        // This is an array to store pieces of comments.
        Comments: {
            type: Array
        }
    },
    {
        versionKey: false
    });
// Duplicate the id field as mongoose returns _id field instead of id.
ComboSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ComboSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('combo', ComboSchema);
