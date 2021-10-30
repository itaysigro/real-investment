 const indexR = require("./index");
 const userR = require("./users");

exports.routesInit = (app) => {
    app.use("/users", userR);
    app.use("/",indexR);
}