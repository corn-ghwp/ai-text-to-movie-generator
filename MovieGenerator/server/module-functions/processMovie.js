const { cleanDialect } = require('./utils/cleanDialect')
const { textToVideoGeneration } = require('./textToVideoGeneration')
const { combineMovie } = require('./combineMovie')

const processMovie = async (dialect, res) => {
    try {
    const user_dialect = dialect
    console.log(user_dialect)
    const stringArr = await cleanDialect(user_dialect)
    console.log(stringArr)
    await textToVideoGeneration(stringArr)
    await combineMovie(stringArr.length)
    res.json({
        Message: "successful, please get video"
      })
    } catch (error) {
        res.status(500).send('Server error');
    }
    
  }

  module.exports = {processMovie};