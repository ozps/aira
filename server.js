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
    let d = req.body.date.substr(0, 19)
    let m = req.body.msg.substr(4, 10)
    for (x of m) {
        if (!isNaN(x)) co += x
    }
    let csv = '\n' + co + ',' + d
    fs.appendFile('data.csv', csv, function(err) {
        if (err) throw err
        console.log('Saved!')
    })
    res.send(csv)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
