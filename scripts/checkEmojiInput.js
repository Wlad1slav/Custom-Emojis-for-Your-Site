import {emojiTag, inputFields} from './input.js';
import {emojisJson} from "./loadEmojis.js";


for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener('input', function(e) {
        // Validating the text inside each div with the with-own-emoji class
        let text = e.target.innerHTML;

        for (let emojiIndex = 0; emojiIndex < emojisJson.length; emojiIndex++) {
            if (text.includes(`${emojisJson[emojiIndex]['shortcode']}`)) {
                // If there is a key phrase in the text field,
                // it is replaced by an image
                e.target.innerHTML = text.replace(emojisJson[emojiIndex]['shortcode'],
                    emojiTag(emojisJson[emojiIndex]['path'], emojisJson[emojiIndex]['alt']));

                moveCursor(inputFields[i]); // Move the input cursor to the end
            }
        }
    });
}

export function moveCursor(inputField) {
    // Method to move the input cursor to the end of the input

    const sel = window.getSelection();
    sel.removeAllRanges();

    // Creates a new range
    const range = document.createRange();
    range.selectNodeContents(inputField); // Selects all content from a div
    range.collapse(false); // false means that the range will be pushed to the end of the content

    // Adds a range to the selection
    sel.addRange(range);

    // Switch the focus to the div so that the user can see the cursor moving
    inputField.focus();
}