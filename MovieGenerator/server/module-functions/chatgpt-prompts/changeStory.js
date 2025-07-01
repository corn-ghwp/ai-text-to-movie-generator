function changeStory(prevInput){
    prompt = `change this story down below based on the prompt given
    ${prevInput}
    This is an how the structure of the reply should be:
    Title: Wolverine ve Deadpool
    Summary: Wolverine is fighting Deadpool in the woods
    Story: ...
    `
    return prompt
}

module.exports = {
  changeStory
  };
//   export multiple items+named exports