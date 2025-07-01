const generateStoryCallback = async (error, storyReply, res) => {
    if (error != null) {
      res.status(500).send('Server error');
      return
    }
    res.json({
        content: storyReply
      })
  }

module.exports = {generateStoryCallback};