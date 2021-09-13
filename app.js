const express = require("express");
const path = require("path");
const http = require("http");
const dbConnect = require("./db/mongoConnect");
const { routesInit } = require("./routes/config_route");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
    origin: "http://127.0.0.1:5501",
})
)
routesInit(app);


const server = http.createServer(app);

let port = process.env.port || "3020";
server.listen(port);