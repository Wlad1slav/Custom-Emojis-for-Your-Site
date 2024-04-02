import {emojiTag, inputFields} from './input.js';
import {moveCursor} from "./moveCursor.js";
import {emojisJson} from "./loadEmojis.js";


for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener('input', function(e) {
        // Validating the text inside each div with the with-own-emoji class
        let text = e.target.innerHTML;

        for (let i = 0; i < emojisJson.length; i++) {
            if (text.includes(`${emojisJson[i]['shortcode']}`)) {
                // If there is a key phrase in the text field,
                // it is replaced by an image
                e.target.innerHTML = text.replace(emojisJson[i]['shortcode'],
                    emojiTag(emojisJson[i]['path'], emojisJson[i]['alt']));

                moveCursor(inputFields[i]); // Move the input cursor to the end
            }
        }
    });
}