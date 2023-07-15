const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const port = process.env.PORT || 3002;
const staticpath = path.join(__dirname, "./public");

app.use(express.static(staticpath));
app.set("view engine", "hbs");

app.get("/", (req,res) => {
    res.render("index");
})

server.listen(port, () => {
    console.log("server is running at port No: " + port);
})
io.on("connection", (socket) => {
    console.log("connected");
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})