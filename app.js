const express = require('express')
const app = express()
const authentication = require('./routes/authentication/authentication');
const user = require('./routes/user/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authentication)
app.use(user)

app.get('/test', (req, res) => {
    res.send("API still alive.")
})

app.listen(3000, () => {})