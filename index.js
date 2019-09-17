const express = require('express')
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    return res.sendFile('C:/Users/bruno.bigotto/Desktop/tic-tac-toe/public/index.html')
});

app.listen(3000, () => {
    console.log("Server started at port 3000")
});