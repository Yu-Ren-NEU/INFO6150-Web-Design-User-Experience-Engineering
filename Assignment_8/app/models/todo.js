'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todo object.
 */
let TodoSchema = new Schema({
    title: {
      type: String,
      required: "Title is missing"
    },
    description: {
      type: String
    },
    due: {
      type: String
    },
    isCompleted: {
      type: Boolean
    }
  },
  {
    versionKey: false
  });
// Duplicate the id field as mongoose returns _id field instead of id.
TodoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TodoSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('todo', TodoSchema);
