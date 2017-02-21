// console.log("Welcome to the persons-api")
const express = require('express')
const {getPerson} = require('./dal.js')
const app = express()

app.get("/persons/:id", function(req,res) {
  getPerson(req.params.id, function(err, doc){
    if (err) res.send(err)
    res.send(doc)
  })
})

app.listen(8080, function() {
  console.log('Example app listening on port 8080!')
})
