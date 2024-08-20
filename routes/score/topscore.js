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

        // Send the response with the top 100 users
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

module.exports = router;