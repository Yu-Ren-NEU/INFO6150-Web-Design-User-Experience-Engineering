'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for user object.
 */
let UserSchema = new Schema({
        Username: {
            type: String,
            required: "Title is missing"
        },
        Mail: {
            type: String,
            required: "Main is missing"
        },
        Phone: {
            type: String,
            required: "Phone is missing"
        },
        Password: {
            type: String,
            required: "Password is missing"
        },
        Createdtime: {
            type: Date
        }
    },
    {
        versionKey: false
    });
// Duplicate the id field as mongoose returns _id field instead of id.
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('user', UserSchema);
