const path = require('path');
const fs = require('fs'); 

const handleStreaming = async (req,res) => {
    const range = req.headers.range
    console.log(range)
    console.log("running")
    if (!range) {
      res.status(400).send("Requires Range Headers")
    }
    const videoPath = path.join(__dirname, "..", "media", "finalMovie.mp4")
    const videoSize = fs.statSync(videoPath).size

    const CHUNK_SIZE = 10 ** 6
    const start = Number(range.replace(/\D/g, ""))
    const endingByte = Math.min(start + CHUNK_SIZE, videoSize - 1)
    const contentLength = endingByte - start + 1


    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${endingByte}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4"
    })

    const videoStream = fs.createReadStream(videoPath, {
      start,
      endingByte
    })

    videoStream.pipe(res)
  }

  module.exports = {handleStreaming};