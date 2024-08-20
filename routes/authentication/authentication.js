const express = require('express');
const router = express.Router();
const { db } = require('../../script/firebase')
const { doc, setDoc, getDoc } = require('firebase/firestore'); 
const e = require('express');

router.post('/signup', async (req, res) => {
    const userDoc = await getDoc(doc(db, "users", req.body.username));

    if (userDoc.exists()) {
        res.send({
            status: 400,
            message: "Username already exists"
        })
    }else if(userDoc.exists()){
        try {
            await setDoc(doc(db, "users", req.body.username), {
                username: req.body.username,
                password: req.body.password,
                score: 0
            });
            
            res.send({
                status: 200,
                message: 'User created successfully',
            });
        } catch (e) {
            res.send({
                status: 400,
                message: 'Error creating user',
            })
        }
    }
});

router.post('/signin', async (req, res) => {
    try {
        const userDoc = await getDoc(doc(db, "users", req.body.username));

        if (userDoc.exists()) {
            const userData = userDoc.data();
            
            if (userData.password === req.body.password) {
                res.send({
                    status: 200,
                    message: 'Sign in successful',
                    data: {
                        username: userDoc.data().username,
                        score: userDoc.data().score
                    }
                });
            } else {
                res.send({
                    status: 401,
                    message: 'Invalid username or password',
                });
            }
        } else {
            res.send({
                status: 404,
                message: 'User not found',
            });
        }
    } catch (e) {
        res.send({
            status: 400,
            message: 'Error signing in',
        });
    }
});

module.exports = router;