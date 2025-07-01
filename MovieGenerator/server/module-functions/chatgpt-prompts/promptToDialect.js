function promptToDialect(story) {
    return `
You are a creative director for text-to-image generation.Break the story below into a 4 number of vivid scene prompts—use however many you need to tell the story completely from start to finish (4 lines).


Formatting rules (strict):
• Output between less than 4 lines, numbered sequentially starting at 1.
• Each line must start with a digit, a single period, **no space** after the period (e.g., "1.sunlit meadow, hero running, blue sky, joyful").
• Use concise, comma‑separated phrases (no full sentences).
• Mention key characters, objects, lighting, mood, and setting.
• ≤30 words per line.
• No extra commentary, blank lines, or numbering gaps.

Story rules (strict):
• Follow the events in **chronological order**—beginning → climax → resolution.
• **Explicitly include every significant event** mentioned in the story idea; do not omit or reorder.
• Preserve the tone, stakes, and emotional beats of the original story.
• Emphasize transitions (setup, rising action, climax, resolution) so the seven prompts read like a storyboard.
• Maintain consistency in character names, locations, and timelines.

  Story idea: ${story}
  `;
  }
  
  module.exports = { promptToDialect };
  