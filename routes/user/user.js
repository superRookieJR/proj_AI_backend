const express = require('express');
const router = express.Router();
const { db } = require('../../script/firebase')
const { doc, getDoc } = require('firebase/firestore');
const { authenticateToken } = require('../../script/authentication.validate');

router.get('/me', authenticateToken, async (req, res) => {
    const userDoc = await getDoc(doc(db, "users", req.user.username));
    res.send({
        status: 200,
        data: {
            username: userDoc.data().username,
            score: userDoc.data().score
        },
    });
});

module.exports = router;