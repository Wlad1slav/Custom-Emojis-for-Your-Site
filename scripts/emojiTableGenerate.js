import {emojisJson} from "./loadEmojis.js";
import {emojiByShortcode, emojiTag} from "./input.js";


function getEmojiButton(emoji, fn) {
    // Creates a clickable sticker that calls the given function
    const emojiButton = emojiTag(emoji['path'], emoji['alt']);
    emojiButton.classList.add('emoji-add-button');
    emojiButton.onclick = () => fn();
    return emojiButton;
}

function addEmojiTo(fieldId, emojiShortcode) {
    // Get an input field by ID and adding an emoji shortcode to it
    const field = document.getElementById(fieldId);
    field.innerHTML += emojiByShortcode(emojiShortcode).outerHTML;
}

const table = document.getElementById('emojis-table');

for (let emojiIndex = 0; emojiIndex < emojisJson.length; emojiIndex++) {
    const button =
        getEmojiButton(emojisJson[emojiIndex], // An emoji that will be clickable
            () => addEmojiTo('field1', emojisJson[emojiIndex]['shortcode'])); // Emoji action

    table.appendChild(button);
}