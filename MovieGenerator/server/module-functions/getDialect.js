const { generateDialect } = require('./generateDialect')

const getDialect = async (finalPrompt,res) => {
    try {
        const dialect = await generateDialect(finalPrompt)
        res.json({
            content: dialect
        })
    } catch (error) {
        res.status(500).send('Server error');
    }
    
  }

  module.exports = {getDialect};