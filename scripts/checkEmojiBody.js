import {emojisJson} from "./loadEmojis.js";
import {emojiTag} from "./input.js";

const body = document.body;

for (let i = 0; i < emojisJson.length; i++) {

    if (body.textContent.includes(emojisJson[i]['shortcode'])) {

        body.innerHTML = body.innerHTML.replace(
            emojisJson[i]['shortcode'],
            emojiTag(emojisJson[i]['path'], emojisJson[i]['alt'])
        );

    }

}