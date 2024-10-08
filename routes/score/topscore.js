const express = require('express');
const router = express.Router();
const { db } = require('../../script/firebase')
const { collection, query, orderBy, limit, getDocs } = require('firebase/firestore');

router.get('/score/topscore', async (req, res) => {
    try {
        const usersRef = collection(db, "users");
        const topScoreQuery = query(usersRef, orderBy("score", "desc"), limit(100));
        const querySnapshot = await getDocs(topScoreQuery);
        const topUsers = querySnapshot.docs.map(doc => ({
            username: doc.id,
            score: doc.data().score
        }));

        res.send({
            status: 200,
            data: topUsers
        });
    } catch (e) {
        console.error('Error fetching top 100 scores:', e);
        res.send({
            status: 500,
            message: 'Error fetching top scores users'
        });
    }
});

router.get('/score/normal', async (req, res) => {
    try {
        const scoresRef = collection(db, "scores");

        // Query for top 100 in score_normal
        const normalScoreQuery = query(scoresRef, orderBy("score_normal", "desc"), limit(100));
        const normalSnapshot = await getDocs(normalScoreQuery);
        const topNormalUsers = normalSnapshot.docs.map(doc => ({
            username: doc.id,
            score_normal: doc.data().score_normal
        }));

        res.send({
            status: 200,
            data: {
                normal: topNormalUsers,
            }
        });
    } catch (e) {
        console.error('Error fetching top 100 scores:', e);
        res.send({
            status: 500,
            message: 'Error fetching top scores users'
        });
    }
});

router.get('/score/endless', async (req, res) => {
    try {
        const scoresRef = collection(db, "scores");

        // Query for top 100 in score_endless
        const endlessScoreQuery = query(scoresRef, orderBy("score_endless", "desc"), limit(100));
        const endlessSnapshot = await getDocs(endlessScoreQuery);
        const topEndlessUsers = endlessSnapshot.docs.map(doc => ({
            username: doc.id,
            score_endless: doc.data().score_endless
        }));

        res.send({
            status: 200,
            data: {
                endless: topEndlessUsers
            }
        });
    } catch (e) {
        console.error('Error fetching top 100 scores:', e);
        res.send({
            status: 500,
            message: 'Error fetching top scores users'
        });
    }
});


module.exports = router;