const PouchDB = require('pouchdb-http')
const {map, omit, compose} = require('ramda')

const db = new PouchDB('http://localhost:3000/test')

// create and export a function that retrieves a person from couch

function getPerson(id,cb) {
  db.get(id, function(err, doc) {
    if (err) return cb(err)
    cb(null, doc)
  })
}

//add a person

function addPerson(doc, cb) {
  db.put(doc, function(err, doc) {
    if (err) return cb(err)
    cb(null, doc)
  })
}

//delete a persons

function deletePerson (id, cb) {
  db.get(id, function(err,doc) {
    if (err) return cb(err)

    db.remove(doc, function(err, removedDoc) {
      if (err) return cb(err)
      cb(null, removedDoc)
    })
  })
}


// getPerson("person_chris_richter_wcrichter@gmail.com", function(err,doc){
//   if (err) return console.log("There's an error!")
//   console.log(doc)
// })

// const dal = module.exports {
//   getPerson: getPerson
// }

const dal = {
  getPerson: getPerson,
  addPerson: addPerson,
  deletePerson: deletePerson
}

module.exports = dal
