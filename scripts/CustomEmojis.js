import {InputField} from './InputField.js';
import {EmojiTable} from "./EmojiTable.js";

function CustomEmojis(emojis=null, emojisJsonPath='emojis.json') {

    const body = document.body;

    this.emojis = emojis; // null

    this.init = async () => {
        // Initialization

        if (this.emojis === null) {
            // If an array with all emojis was not specified,
            // they are loaded from the json file
            await computeEmojis();
        }

        // Search the page for shortcodes and convert them to emojis
        await bootSearchShortcodes();
    }

    // // // // // // // // // // // // // // // // // // // // //
    // COMPUTE: Loading of necessary information from configs   //
    // // // // // // // // // // // // // // // // // // // // //
    const computeEmojis = async () => {
        // Loads all emojis
        try {
            const response = await fetch(emojisJsonPath);
            this.emojis = await response.json();
        } catch (error) {
            console.log('Error loading emojis:', error);
            throw error;
        }
    }

    // // // // // // // // // // // // //
    // BOOT: Loading on initialization  //
    // // // // // // // // // // // // //
    const bootSearchShortcodes = async () => {
        // Checks the entire page for shortcodes,
        // if it finds shortcodes, replaces them with emojis

        for (let emojiIndex in this.emojis) {
            if (body.textContent.includes(this.emojis[emojiIndex]['shortcode'])) {
                body.innerHTML = body.innerHTML.replace(
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
    this.emojiTag = (path, alt) => {
        // Returns an emoji element
        const emoji = document.createElement('img');
        emoji.src = path;
        emoji.classList.add('svg-emoji');
        emoji.alt = alt;

        return emoji;
    }

    this.getEmoji = (shortcode) => {
        // Get emoji by shortcode
        for (let i in this.emojis) {
            if (this.emojis[i]['shortcode'] === shortcode) {
                return this.emojiTag(this.emojis[i]['path'], this.emojis[i]['alt']);
            }
        }
    }

    this.createEmojiButton = (emoji, fn) => {
        // Creates a clickable emoji that calls the given function
        const emojiButton = this.emojiTag(emoji['path'], emoji['alt']);
        emojiButton.classList.add('emoji-button');
        emojiButton.onclick = () => fn();
        return emojiButton;
    }

    this.addEmojiToHtml = (emojiShortcode, fieldId, field=null) => {
        // Get an input field by ID and adding an emoji shortcode to it

        if (field === null) {
            field = document.getElementById(fieldId);
        }
        field.innerHTML += this.getEmoji(emojiShortcode).outerHTML;

    }

    this.addInputField = function (fieldId, field=null) {
        // Adds the ability to use custom emojis in a specific input field
        // The input field must have a div tag with the attribute contenteditable="true"

        if (field === null) {
            field = document.getElementById(fieldId);
        }

        new InputField(this, fieldId, field)
    }

    this.addEmojiTable = function (htmlToAddId, tableId, table=null) {
        // Adds all emojis in the form of buttons to a given html object

        if (table === null) {
            table = document.getElementById(tableId);
        }

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
