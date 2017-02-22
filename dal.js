const PouchDB = require('pouchdb-http')
const {
    map,
    omit,
    compose,
    prop
} = require('ramda')

const db = new PouchDB('http://localhost:3000/test')

// create and export a function that retrieves a person from couch

function getPerson(id, cb) {
    db.get(id, function(err, doc) {
        if (err) return cb(err)
        cb(null, doc)
    })
}

//add a person

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

//delete a person

function deletePerson(id, cb) {
    db.get(id, function(err, doc) {
        if (err) return cb(err)

        db.remove(doc, function(err, removedDoc) {
            if (err) return cb(err)
            cb(null, removedDoc)
        })
    })
}

//update a person
function updatePerson(doc, cb) {
    // db.get(id, function(err, doc) {
    //   if (err) return cb(err)

    db.put(doc, function(err, updatedDoc) {
        if (err) return cb(err)
        cb(null, updatedDoc)
    })
    // })
}

//get all persons
function getPersons(cb) {
  db.allDocs({include_docs: true,
        start_key: "person_",
        end_key: "person_\uffff"}, function(err, retrievedPersons) {
      if (err) return cb(err)
      cb(null, map(x => x.doc , retrievedPersons.rows))
  })
}

//helpers

//this adds an id and type key to a new doc based off info supplied in the body
function prepNewPerson(doc) {
    doc._id = 'person' + '_' + doc.firstName.toLowerCase() + '_' + doc.lastName.toLowerCase() + '_' + doc.email.toLowerCase()
    doc.type = 'person'
    return doc
}

//check for values
function checkPersonRequiredValues(doc) {
    return prop('firstName', doc) && prop('lastName', doc) && prop('email', doc)
}

const dal = {
    getPerson: getPerson,
    addPerson: addPerson,
    deletePerson: deletePerson,
    updatePerson: updatePerson,
    getPersons: getPersons
}

module.exports = dal
