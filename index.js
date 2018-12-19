const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/received_data', (req, res) => {
    // Receive & Write to File
})

app.get('/api/sent_data', (req, res) => {
    // Read From File & Send
})

app.listen(port, () => console.log(`Listening on port ${port}`))
