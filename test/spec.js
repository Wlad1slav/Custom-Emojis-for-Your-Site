import {CustomEmojis} from "../scripts/CustomEmojis.mjs";

const emojiObj = new CustomEmojis({
    emojis: [
        {
            shortcode: "/femboy/",
            path: "https://chpic.su/_data/stickers/f/FatalAmethystCaterpillar_by_fStikBot/FatalAmethystCaterpillar_by_fStikBot_013.webp?v=1705875303",
            keywords: ["femboy", "cute", "uwu", "owo"],
            alt: "\uD83D\uDE0A"
        }
    ],
    autoSearchShortcodes: true
});

emojiObj.init().then(r => {
    // ...
    console.log(emojiObj.createEmojiButton(emojiObj.getEmoji('/femboy/'), () => console.log('test')));
    emojiObj.addInputField('field1');
    emojiObj.addEmojiTable('field1', 'emojisTable');
});

console.log(`\u001B[32m✓\u001B[39m Tests passed`);