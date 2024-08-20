const express = require('express')
const app = express()
const authentication = require('./routes/authentication/authentication');
const user = require('./routes/user/user');
const score = require('./routes/score/score');
const { authenticateToken } = require('./script/authentication.validate');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authentication)
app.use(user)
app.use(score)

app.get('/test', (req, res) => {
    res.send({
        status: 200,
        message: 'API Still Alive!!!',
    })
})

app.get('/testtoken', authenticateToken, (req, res) => {
    res.send({
        status: 200,
        message: "Token valid",
        user: req.user 
    })
})

app.listen(3000, () => {})