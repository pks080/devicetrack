const express = require('express');

const app = express();
const http = require("http"); //http chahiye socketio ko run krwane k lie.
const path = require("path");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    });

    socket.on("disconnect", function(){
        io.emit("user-disconnect")
    })
});

app.get("/", function (req, res){
    res.render("index");
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});