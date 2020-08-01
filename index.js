const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const settings = require('./settings')
const users = require('./users')

const app = express()

app.use(bodyParser.json())

app.listen(settings.port, () => {
    console.log('Authentication service started on port ' + String(settings.port))
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => { return u.username === username })

    if (!user) {
        res.sendStatus(403)
    }

    bcrypt.compare(password, user.hash, (err, result) => {
        if (result) {
            const token = jwt.sign({ username: user.username,  role: user.role }, settings.secret)
            res.json({ token })
        }
        else {
            res.sendStatus(403)
        }
    })
})

app.post('/hash', (req, res) => {
    bcrypt.hash(req.body.password, settings.saltRounds, (err, hash) => {
        res.json({ hash })
    })
})