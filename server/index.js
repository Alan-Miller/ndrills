require('dotenv').config()
const express = require('express')
const app = express()
const port = 4000
const data = require('./data')
const bodyParser = require('body-parser')
const massive = require('massive')

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
})
app.use(bodyParser.json())

app.get('/api/data', (req, res) => {
  // res.status(200).send(data)
  app.get('db').get_data().then(cars => {
    res.status(200).send(cars)
  })
})

app.post('/api/data', (req, res) => {
  // console.log("req.body", req.body)
  // const newObj = Object.assign({}, {animals: req.body.animals, soda: req.body.soda})
  // const newObj = { hopefullyUnicorns: req.body.animals, isItCoke: req.body.soda }
  // if (req.body.side && req.body.year && req.body.miles && req.body.gas) {
  //   data.push(req.body)
  // }
  // res.status(200).send("We got it")


  
  app.get('db').add_car([req.body.side, req.body.year, req.body.miles, req.body.gas]).then(resp => {
    res.status(200).send(resp)
  })

  // data.forEach(item => {
  //   app.get('db').add_car([item.side, item.year, item.miles, item.gas]).then(resp => {
  //     res.status(200).send(resp)
  //   })
  // })

})

app.listen(port, () => { console.log(`Listening on port ${port}`) })