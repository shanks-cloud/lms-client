
const path = require("path");
const fs = require("fs");
const dirname = "d:/my-angular-workspace/lms-client/src/assets/images/target/Computer Science";
//const dirname = "/assets/images/target/Computer Science";

function findAllFiles() {

    const directoryPath = path.join(dirname);

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log("Error getting directory information.")
        } else {
            files.forEach(function (file) {
                console.log(file);
                return file;
            })
        }

        return files;
    })
}

module.exports = findAllFiles();


