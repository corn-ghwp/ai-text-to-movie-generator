
$(document).ready(function () {
  $(".elaborate-button").on("click", async (event) => {
    event.preventDefault();
    const inputValue = $(".chatgpt-input").val();
        await fetch("http://localhost:3000/generate-story", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ input: inputValue }),
      }).then(async (res)=>{
        if (!res.ok) {
            throw new Error("");
          }
        const data  = await res.json();
        const message = data.content
        const formattedMessage = message.replace(/\n/g, "<br>");
        $(".response").html(formattedMessage);
        $(".refresh-button").css("display", "block");
        $(".dialect-button").css("display", "block");
      }).catch(error=>{
        $(".response").html('<h1>Message sent Error, try again</h1>');
      });
  });

  $(".refresh-button").on("click", async (event) => {
    event.preventDefault();
    const refreshUserInput = $(".chatgpt-input").val();
    const oldUserStory = $(".response").text();

        await fetch("http://localhost:3000/rechange-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: refreshUserInput, prevInput: oldUserStory }),
      }).then(async (res)=>{
        if (!res.ok) {
          throw new Error("");
        }
        const data  = await res.json();
        const message = data.content
        const formattedMessage = message.replace(/\n/g, "<br>");
        $(".response").html(formattedMessage);
      }).catch(error=>{
        $(".response").html('<h1>Refresh Message sent Error, try again</h1>');
      });
  });

  $(".dialect-button").on("click", async (event) => {
    event.preventDefault();
    const finalStory = $(".response").text();

        await fetch("http://localhost:3000/get-dialect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finalPrompt: finalStory }),
      }).then(async (res)=>{
        if (!res.ok) {
          throw new Error("");
        }
        const data  = await res.json();
        const message = data.content
        const formattedMessage = message.replace(/\n/g, "<br>");
        $(".dialectDiv").html(formattedMessage);
      }).catch(error=>{
        $(".dialectDiv").html('<h1>gettingDialect Error, try again</h1>');
      });
  });

  $(".process-movies-button").on('click', async (event) => {
    event.preventDefault();
    $(".processing").text("processing...")
    const dialect = $(".dialectDiv").text();
    await fetch("http://localhost:3000/process-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dialect: dialect }),
      })
    .then(async (res)=>{
      if (!res.ok) {
        throw new Error("");
      }
      const data  = await res.json();
      const message = data.Message
      $(".processing").text(message);
    }).catch(error=>{
      $(".processing").html('<h1>Processing Error, try again</h1>');
    })
  });

  $(".get-movies-button").on('click', (event) => {
    event.preventDefault();
    // Directly set the video `src` to the endpoint
    $('#video-container').attr('src', 'http://localhost:3000/get-movie');
  });
});
