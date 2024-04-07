import {InputField} from './InputField.js';
import {EmojiTable} from "./EmojiTable.js";

class CustomEmojis {

    #body = document.body;
    #emojisJsonPath;

    constructor(emojis=null, emojisJsonPath='emojis.json') {
        this.emojis = emojis; // null
        this.#emojisJsonPath = emojisJsonPath;
    }

    async init() {
        // Initialization

        if (this.emojis === null) {
            // If an array with all emojis was not specified,
            // they are loaded from the json file
            await this.#computeEmojis();
        }

        // Search the page for shortcodes and convert them to emojis
        await this.bootSearchShortcodes();
    }

    // // // // // // // // // // // // // // // // // // // // //
    // COMPUTE: Loading of necessary information from configs   //
    // // // // // // // // // // // // // // // // // // // // //
    async #computeEmojis() {
        // Loads all emojis
        try {
            const response = await fetch(this.#emojisJsonPath);
            this.emojis = await response.json();
        } catch (error) {
            console.log('Error loading emojis:', error);
            throw error;
        }
    }

    // // // // // // // // // // // // //
    // BOOT: Loading on initialization  //
    // // // // // // // // // // // // //
    async bootSearchShortcodes() {
        // Checks the entire page for shortcodes,
        // if it finds shortcodes, replaces them with emojis

        for (let emojiIndex in this.emojis) {
            if (this.#body.textContent.includes(this.emojis[emojiIndex]['shortcode'])) {
                this.#body.innerHTML = this.#body.innerHTML.replace(
                    this.emojis[emojiIndex]['shortcode'],
                    // emojiTag returns an emoji element, outerHTML converts it to a string
                    this.emojiTag( this.emojis[emojiIndex]['path'],  this.emojis[emojiIndex]['alt']).outerHTML
                );
            }
        }
        
    }

    // // // // // // // // //
    // Class methods to use //
    // // // // // // // // //
    emojiTag(path, alt) {
        // Returns an emoji element
        const emoji = document.createElement('img');
        emoji.src = path;
        emoji.classList.add('svg-emoji');
        emoji.alt = alt;
        return emoji;
    }

    getEmoji(shortcode) {
        // Get emoji by shortcode
        for (let i in this.emojis) {
            if (this.emojis[i]['shortcode'] === shortcode) {
                return this.emojiTag(this.emojis[i]['path'], this.emojis[i]['alt']);
            }
        }
    }

    createEmojiButton(emoji, fn) {
        // Creates a clickable emoji that calls the given function
        const emojiButton = this.emojiTag(emoji['path'], emoji['alt']);
        emojiButton.classList.add('emoji-button');
        emojiButton.onclick = () => fn();
        return emojiButton;
    }

    addEmojiToHtml(emojiShortcode, elementId, element=null) {
        // Adds an emoji to a specific element based on shortcode

        element = element === null ? document.getElementById(elementId) : element;
        element.innerHTML += this.getEmoji(emojiShortcode).outerHTML;

    }

    addInputField(fieldId, field=null) {
        // Adds the ability to use custom emojis in a specific input field
        // The input field must have a div tag with the attribute contenteditable="true"

        field = field === null ? document.getElementById(fieldId) : field;
        new InputField(this, fieldId, field)
    }

    addEmojiTable (htmlToAddId, tableId, table=null) {
        // Adds all emojis in the form of buttons to a given html object

        table = table === null ? document.getElementById(tableId) : table;
        new EmojiTable(this, htmlToAddId, tableId, table)
    }
    
}

const emojiObj = new CustomEmojis(null, 'emojis.json');

emojiObj.init().then(r => {
    // ...
    console.log(emojiObj.emojis);
    emojiObj.addInputField('field1');
    emojiObj.addEmojiTable('field1', 'emojis-table');
});
