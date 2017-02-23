const PouchDB = require('pouchdb-http')
const {
    map,
    omit,
    compose,
    prop
} = require('ramda')

const db = new PouchDB('http://localhost:3000/test')


//PEOPLE

//get ALL persons from database
function getPersons(limit, cb) {
    db.allDocs({
        include_docs: true,
        start_key: "person_",
        end_key: "person_\uffff",
        limit: limit
    }, function(err, retrievedPersons) {
        if (err) return cb(err)
        cb(null, map(x => x.doc, retrievedPersons.rows))
    })
}

// get a person from database
function getPerson(id, cb) {
    db.get(id, function(err, doc) {
        if (err) return cb(err)
        cb(null, doc)
    })
}

//add a person to database
function addPerson(doc, cb) {
    if (checkPersonRequiredValues(doc)) {
        db.put(prepNewPerson(doc), function(err, doc) {
            if (err) return cb(err)
            cb(null, doc)
        })
    } else {
        return cb({
            "name": "bad request",
            "status": 400,
            "message": "Adding a person requires a firstName, lastName, and email.",
            "reason": "Bad Request",
            "error": "bad_request"
        })
    }
}

//update a person in database
function updatePerson(doc, cb) {
    db.put(doc, function(err, updatedDoc) {
        if (err) return cb(err)
        cb(null, updatedDoc)
    })
}

//delete a person from database
function deletePerson(id, cb) {
    db.get(id, function(err, doc) {
        if (err) return cb(err)
        db.remove(doc, function(err, removedDoc) {
            if (err) return cb(err)
            cb(null, removedDoc)
        })
    })
}


//ADDRESSES

//get all addresses from database
function getAddresses(cb) {
    db.allDocs({
        include_docs: true,
        start_key: "address_",
        end_key: "address_\uffff"
    }, function(err, retrievedAddresses) {
        if (err) return cb(err)
        cb(null, retrievedAddresses.rows)
    })
}

//get an address from database
function getAddress(id, cb) {
    db.get(id, function(err, doc) {
        if (err) return cb(err)
        cb(null, doc)
    })
}

//add an address to database
function addAddress(doc, cb) {
    if (checkAddressRequiredValues(doc)) {
        db.put(doc, function(err, doc) {
            if (err) return cb(err)
            cb(null, doc)
        })
    } else {
        return cb({
            "name": "bad request",
            "status": 400,
            "message": "Adding an address requires a street, city, state, and zip.",
            "reason": "Bad Request",
            "error": "bad_request"
        })
    }
}

//update an address in database
function updateAddress(doc, cb) {
    db.put(doc, function(err, updatedDoc) {
        if (err) return cb(err)
        cb(null, updatedDoc)
    })
}

//delete an address from database
function deleteAddress(id, cb) {
    db.get(id, function(err, doc) {
        if (err) return cb(err)
        db.remove(doc, function(err, deletedDoc) {
            if (err) return cb(err)
            cb(null, deletedDoc)
        })
    })
}


//helpers

//this adds an id and type key to a new doc based off info supplied in the body
function prepNewPerson(doc) {
    doc._id = 'person' + '_' + doc.firstName.toLowerCase() + '_' + doc.lastName.toLowerCase() + '_' + doc.email.toLowerCase()
    doc.type = 'person'
    return doc
}

//check for necessary person values
function checkPersonRequiredValues(doc) {
    return prop('firstName', doc) && prop('lastName', doc) && prop('email', doc)
}

//check for necessary address values
function checkAddressRequiredValues(doc) {
    return prop('street', doc) && prop('city', doc) && prop('state', doc) && prop('zip', doc)
}


const dal = {
    getPerson: getPerson,
    addPerson: addPerson,
    deletePerson: deletePerson,
    updatePerson: updatePerson,
    getPersons: getPersons,
    getAddresses: getAddresses,
    getAddress: getAddress,
    addAddress: addAddress,
    updateAddress: updateAddress,
    deleteAddress: deleteAddress
}

module.exports = dal
