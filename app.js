// console.log("Welcome to the persons-api")
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const {
    getPersons,
    getPerson,
    addPerson,
    updatePerson,
    deletePerson,
    getAddresses,
    getAddress,
    addAddress,
    updateAddress,
    deleteAddress
} = require('./dal.js')
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')

app.use(bodyParser.json())


//PEOPLE

//HTTP request(GET) to get ALL persons from database
app.get('/persons', function(req, res, next) {
  getPersons(req.query.limit, function(err, dalResponse) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(dalResponse)
  })
})

//HTTP request(GET) to get a person from database
app.get("/persons/:id", function(req, res, next) {
    getPerson(req.params.id, function(err, dalResponse) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(200).send(dalResponse)
    })
})

//HTTP request(POST) to add a person to database
app.post('/persons', function(req, res, next) {
    addPerson(req.body, function(err, dalResponse) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(201).send(dalResponse)
    })
})

//HTTP request(PUT) to update a person in database
app.put('/persons/:id', function(req, res, next) {
  updatePerson(req.body, function(err, updatedResonse) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(updatedResonse)
  })
})

//HTTP request(DELETE) to delete a person from database
app.delete('/persons/:id', function(req, res, next) {
    deletePerson(req.params.id, function(err, person) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(200).send(person)
    })
})


//ADDRESSES

//HTTP request(GET) to get ALL addresses from database
app.get('/addresses', function(req, res, next) {
  getAddresses(function(err, dalResponse) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(dalResponse)
  })
})

//HTTP request(GET) to get an address from database
app.get('/addresses/:id', function(req, res, next) {
  getAddress(req.params.id, function(err, returnedDoc) {
    if(err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(returnedDoc)
  })
})

//HTTP request(POST) to add an address to database
app.post('/addresses', function(req, res, next) {
  addAddress(req.body, function(err, newAddress) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(201).send(newAddress)
  })
})

//HTTP request(PUT) to update an address in database
app.put('/addresses/:id', function(req, res, next) {
  updateAddress(req.body, function(err, updatedAddress) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(updatedAddress)
  })
})

//HTTP request(DELETE) to delete an address from database
app.delete('/addresses/:id', function(req, res, next) {
  deleteAddress(req.params.id, function(err, dalResponse) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(dalResponse)
  })
})


//error handler
app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500)
    res.send(err)
})


app.listen(port, function() {
    console.log('persons api started on: ', port)
})
