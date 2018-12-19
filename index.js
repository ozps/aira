const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.post('/api/write_data', (req, res) => {
    let co = ''
    for (x of req.body.msg) {
        if (!isNaN(x)) co += x
    }
    let csv = '\n' + co + ',' + new Date()
    fs.appendFile('data.csv', csv, function(err) {
        if (err) throw err
        console.log('Saved!')
    })
    res.send(csv)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
