import WebSocket, {WebSocketServer} from 'ws';
const cors = require('cors');
const express = require('express');

type TeamsSchema = {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    points: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
};
let teamsAndPoints = [{name: 'default', points: 0, id: 0}]

  
const app = express();
app.use(express.json())
app.use(cors())
const wss = new WebSocketServer({ port: 8080, });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send(JSON.stringify(teamsAndPoints));
});



app.post("/update", async (req, resp) => {

    try {

        teamsAndPoints = req.body
        resp.send(req.body);
        wss.clients.forEach(function each(ws) {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(teamsAndPoints))
            }
        })

    } catch (e) {
        resp.send("Something Went Wrong");
    }
});


app.get("/live", async (req, resp) => {
    resp.send(teamsAndPoints);
})

//Start the server.

app.listen(5000, function () {
  console.log('Listening on http://localhost:5000');
});