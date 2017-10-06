const runAll = require("npm-run-all");

runAll(["frontend", "backend"], {parallel: true})
    .then(() => {
        console.log("Server started");
    })
    .catch(err => {
        console.log("Server has failed to start");
    });
