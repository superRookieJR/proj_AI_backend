const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.send({
        status: 401,
        message: 'Unauthorized'
    });;

    jwt.verify(token, 'shhhhh', (err, user) => {
        if (err) return res.send({
            status: 403,
            message: 'Forbidden'
        });
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken }