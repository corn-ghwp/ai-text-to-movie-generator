const { exec } = require('child_process');
const path    = require("path");
const combineMovie = async(index)=>{
    // Run the Python script and pass an argument
    return new Promise((resolve, reject) => {
        const cmd = `python "${path.join(__dirname, "/python-files/combineVideos.py")}" ${index}`;
        exec(cmd, (error, stdout, stderr) => {
            if (error) return reject(error);  // true error: non-zero exit

            if (stderr.trim()) {
              console.warn("Python stderr:", stderr);  // log but don’t reject
            }
          
            resolve(stdout.trim());                    // success
          });   
    });
}

module.exports = {combineMovie}
