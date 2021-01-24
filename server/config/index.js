// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore');

// Creates a client
const datastore = new Datastore();

module.exports = { datastore }