// console.log("Welcome to the persons-api")
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const {
    getPerson,
    addPerson,
    deletePerson,
    updatePerson,
    getPersons,
    getAddresses
} = require('./dal.js')
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')

app.use(bodyParser.json())

//PEOPLE

app.post('/persons', function(req, res, next) {
    addPerson(req.body, function(err, dalResponse) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(201).send(dalResponse)
    })
})

app.get("/persons/:id", function(req, res, next) {
    getPerson(req.params.id, function(err, dalResponse) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(200).send(dalResponse)
    })
})

app.delete('/persons/:id', function(req, res, next) {
    deletePerson(req.params.id, function(err, person) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(200).send(person)
    })
})

app.put('/persons/:id', function(req, res, next) {
  updatePerson(req.body, function(err, updatedResonse) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(updatedResonse)
  })
})

app.get('/persons', function(req, res, next) {
  getPersons(req.query.limit, function(err, dalResponse) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(dalResponse)
  })
})

//ADDRESSES
app.get('/addresses', function(req, res, next) {
  getAddresses(function(err, dalResponse) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(dalResponse)
  })
})

//Error Handler
app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500)
    res.send(err)
})

app.listen(port, function() {
    console.log('persons api started on: ', port)
})
