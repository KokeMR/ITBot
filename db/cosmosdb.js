var mongodb = require('mongodb').MongoClient,
    cosmosDbURL = 'mongodb://botitdb:zpcH20B1TpGm31T2nlktpnZPz6D0CInmkebNgWvPCdu8WlowQLupOBJeQmZk6xMLCxlwrWex2wHqZDxtt0fTcg==@botitdb.documents.azure.com:10255/?ssl=true&replicaSet=globaldb',
    exports = module.exports = {};

exports.init = function () {
    console.log('Initializating collections...');

    mongodb.connect(cosmosDbURL, function (err, db) {
        if (err) {
            console.log('mongodb.connect error: %s', err);
        }
        else {
            var collection = db.collection('help_type');
            collection.insertMany([
                {
                    type: 'Network support',
                    helpers: [{
                        name: 'Félix Berlanga',
                        mail: 'v-felber@microsoft.com',
                        alias: 'v-felber'

                    }]
                }
            ], function (err, results) {
                if (err) {
                    console.log('collection.insertMany error: %s', err);
                }
                else {
                    console.log(results);
                }
            });
        }
    });
};

exports.getTypes = function (done) {
    mongodb.connect(cosmosDbURL, function (err, db) {
        if (err) {
            console.log('mongodb.connect error: %s', err);
        }
        else {
            var collection = db.collection('help_type');
            collection.find({}).toArray(function (err, docs) {
                console.log(docs);
                done(docs);
            });
        }
    });
}