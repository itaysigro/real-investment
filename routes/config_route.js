 const indexR = require("./index");
 const userR = require("./users");
 const foodsR = require("./foods");

exports.routesInit = (app) => {
    app.use("/users",userR);
    app.use("/foods",foodsR);
    app.use("/",indexR);
}