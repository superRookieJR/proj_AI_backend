const express = require('express');
const router = express.Router();
const { db } = require('../../script/firebase')
const { doc, getDoc, updateDoc } = require('firebase/firestore');
const { authenticateToken } = require('../../script/authentication.validate');

router.post('/score/increase', authenticateToken, async (req, res) => {
    const userDoc = await getDoc(doc(db, "users", req.user.username));
    const newScore = userDoc.data().score + 1;

    try{
        await updateDoc(doc(db, "users", req.user.username), {
            score: newScore
        });

        res.send({
            status: 200,
            data: {
                username: req.user.username,
                score: newScore
            },
        });
    }catch(e){
        res.send({
            status: 400,
            message: 'Error to increase score'
        });
    }
});

router.post('/score/decrease', authenticateToken, async (req, res) => {
    const userDoc = await getDoc(doc(db, "users", req.user.username));
    const newScore = userDoc.data().score - 1;

    try{
        await updateDoc(doc(db, "users", req.user.username), {
            score: newScore
        });

        res.send({
            status: 200,
            data: {
                username: req.user.username,
                score: newScore
            },
        });
    }catch(e){
        res.send({
            status: 400,
            message: 'Error to increase score'
        });
    }
});

module.exports = router;