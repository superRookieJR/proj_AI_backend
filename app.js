// server.js (or create a custom server with Socket.IO support)
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const authentication = require('./routes/authentication/authentication');
const user = require('./routes/user/user');
const score = require('./routes/score/score');
const topscore = require('./routes/score/topscore');
// const game = require('./routes/game/game');
const { authenticateToken } = require('./script/authentication.validate');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authentication);
app.use(user);
app.use(score);
app.use(topscore);

let rooms = {};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', (roomId, username) => {
        const roomCheck = Object.values(rooms).find(room => room.id == roomId);

        console.log(roomCheck)

        if (!roomCheck) {
            rooms[roomId] = {
                id: roomId,
                players: [],
            }
            console.log(rooms)
            rooms[roomId].players.push(
                {
                    player: 1,
                    username: username,
                    score: 0,
                    uid: socket.id
                }
            )
            socket.emit("isFirst", true)
            console.log(`Room created: ${roomId}`);
        } else {
            console.log(`Room ${roomId} already exists.`)
            rooms[roomId].players.push(
                {
                    player: 2,
                    username: username,
                    score: 0,
                    uid: socket.id
                }
            )
            socket.emit("isFirst", false)
            socket.emit("syncPlayer", roomId, rooms[roomId].players)
        }

        const playerCheck = rooms[roomId].players.length == 2

        console.log(`Two Player ${playerCheck}`)
        
        if(playerCheck){
            socket.emit("startGame", roomId)
        }

        // const room = rooms[roomId];

        // if (room && room.players.length <= 2) {
        //     room.players.push({username, score: 0 });
        //     console.log(`User joined room: ${roomId}`);

        //     if (room.players.length === 2) {
        //         socket.emit('startGame', roomId);
        //     } else {
        //         socket.emit('wait', roomId); // Wait for the second player
        //     }
        // } else if (!room) {
        //     socket.emit('error', `Room ${roomId} does not exist.`);
        // } else {
        //     socket.emit('error', `Room ${roomId} is full.`);
        // }
    });

    // socket.on('disconnect', () => {
    //     console.log(`User disconnected: ${socket.id}`);
    //     for (const roomId in rooms) {
    //         const room = rooms[roomId];
    //         const playerIndex = room.players.findIndex(player => player.id === socket.id);
    //         if (playerIndex !== -1) {
    //             room.players.splice(playerIndex, 1);
    //             socket.leave(roomId);
    //             console.log(`User left room: ${roomId}`);

    //             // If there's one player left, notify the other player
    //             if (room.players.length === 1) {
    //                 io.in(roomId).emit('playerDisconnected', room.players[0]);
    //             }

    //             // If no players are left, delete the room
    //             if (room.players.length === 0) {
    //                 delete rooms[roomId];
    //                 console.log(`Room ${roomId} deleted`);
    //             }
    //         }
    //     }
    // });

    // socket.on('playerMove', ({ roomId, move }) => {
    //     const room = rooms[roomId];
    //     if (room) {
    //         // Track player moves
    //         room.playerMoves[socket.id] = move;

    //         // If both players made their moves
    //         if (Object.keys(room.playerMoves).length === 2) {
    //             const player1 = room.players[0];
    //             const player2 = room.players[1];
    //             const player1Move = room.playerMoves[player1.id];
    //             const player2Move = room.playerMoves[player2.id];

    //             // Determine round result (custom logic for win/lose/tie)
    //             const result = determineRoundResult(player1Move, player2Move);

    //             if (result === 'player1') {
    //                 player1.score++;
    //             } else if (result === 'player2') {
    //                 player2.score++;
    //             }

    //             io.in(roomId).emit('roundResult', {
    //                 player1Move,
    //                 player2Move,
    //                 result,
    //                 scores: [player1.score, player2.score],
    //                 round: room.round
    //             });

    //             // Reset moves and increment the round
    //             room.playerMoves = {};
    //             room.round++;

    //             // If 5 rounds are completed or other condition for game end
    //             if (room.round > 5) {
    //                 io.in(roomId).emit('gameOver', {
    //                     winner: player1.score > player2.score ? player1.username : player2.username,
    //                     player1Score: player1.score,
    //                     player2Score: player2.score
    //                 });
    //                 delete rooms[roomId];
    //             }
    //         }
    //     }
    // });
});

server.listen(3001, () => {
    console.log('Listening on port 3001');
});

function determineRoundResult(player1Move, player2Move) {
    // Example logic for determining who won the round
    if (player1Move === player2Move) return 'tie';
    if (
        (player1Move === 'rock' && player2Move === 'scissors') ||
        (player1Move === 'scissors' && player2Move === 'paper') ||
        (player1Move === 'paper' && player2Move === 'rock')
    ) {
        return 'player1';
    }
    return 'player2';
}
