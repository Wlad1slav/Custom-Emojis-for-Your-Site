import {emojisJson} from "./loadEmojis.js";

export const inputFields = document.getElementsByClassName('with-own-emoji');

export const emojiTag = (path, alt) => {
    // Returns an emoji element
    const emoji = document.createElement('img');
    emoji.src = path;
    emoji.classList.add('svg-emoji');
    emoji.alt = alt;

    return emoji;
}

export const emojiByShortcode = (shortcode) => {
    for (let i = 0; i < emojisJson.length; i++) {
        if (emojisJson[i]['shortcode'] === shortcode) {
            return emojiTag(emojisJson[i]['path'], emojisJson[i]['alt']);
        }
    }
}