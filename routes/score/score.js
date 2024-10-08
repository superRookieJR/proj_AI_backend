const express = require('express');
const router = express.Router();
const { db } = require('../../script/firebase')
const { doc, getDoc, setDoc, updateDoc } = require('firebase/firestore');
const { authenticateToken } = require('../../script/authentication.validate');

const checkAndCreateUser = async (username) => {
    const userDocRef = doc(db, "scores", username);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        // Create a new user with initial scores if not exists
        await setDoc(userDocRef, {
            score_normal: 0,
            score_endless: 0
        });
    }
};


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

router.post('/score/normal', async (req, res) => {
    try {
        const { username, score } = req.body;

        // Check and create user if doesn't exist
        await checkAndCreateUser(username);

        if (score > 50) {
            await updateDoc(doc(db, "scores", username), {
                score_normal: score
            });

            res.send({
                status: 200,
                data: {
                    username,
                    score
                },
            });
        } else {
            res.send({
                status: 400,
                message: "That's too much score bro"
            });
        }
    } catch (e) {
        console.error('Error:', e);
        res.send({
            status: 400,
            message: 'Error to increase score'
        });
    }
});

router.post('/score/endless', async (req, res) => {
    try {
        const { username, score } = req.body;

        // Check and create user if doesn't exist
        await checkAndCreateUser(username);

        if (score > 50) {
            await updateDoc(doc(db, "scores", username), {
                score_endless: score
            });

            res.send({
                status: 200,
                data: {
                    username,
                    score
                },
            });
        } else {
            res.send({
                status: 400,
                message: "That's too much score bro"
            });
        }
    } catch (e) {
        console.error('Error:', e);
        res.send({
            status: 400,
            message: 'Error to increase score'
        });
    }
});


module.exports = router;