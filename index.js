const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const Json2csvParser = require('json2csv').Parser
const fields = ['CO', 'Date']
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.post('/api/received_data', (req, res) => {
    const json2csvParser = new Json2csvParser({ fields })
    const data = { CO: req.body.msg, Date: req.body.date }
    const csv = json2csvParser.parse(data)
    fs.appendFile('data.csv', csv, function(err) {
        if (err) throw err
        console.log('Saved!')
    })
    res.send(csv)
})

app.get('/api/sent_data', (req, res) => {})

app.listen(port, () => console.log(`Listening on port ${port}`))
