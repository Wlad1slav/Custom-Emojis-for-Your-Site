export function EmojiTable(emojisObj, htmlToAddId, tableId, table=null) {

    // A table with all emojis in the form of buttons that add emojis to a specific html container

    this.table = table === null ? document.getElementById(tableId) : table;

    for (let emojiIndex in emojisObj.emojis) {
        // During the cycle, a button is created and added to the specified container
        const button = emojisObj.createEmojiButton(
            emojisObj.emojis[emojiIndex], // An emoji that will be clickable
            () => emojisObj.addEmojiToHtml(emojisObj.emojis[emojiIndex]['shortcode'], htmlToAddId) // Emoji action
        );

        this.table.appendChild(button);
    }

}