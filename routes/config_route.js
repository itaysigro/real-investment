const userR = require("./users");

exports.routesInit = (app) => {
    app.use("/users", userR);
}