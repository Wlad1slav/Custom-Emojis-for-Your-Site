export function InputField(emojisObj, fieldId, field=null) {
    /*
    Text input field with custom emojis

    The ID of the tag of the input field or the input field itself is passed

    If the input field is not specified, it is searched for by id

    The input field must have a div tag with the attribute contenteditable="true"
    */

    if (field === null) {
        this.field = document.getElementById(fieldId);
    } else {
        this.field = field;
    }

    // CHECKING THE ENTERED TEXT FOR THE PRESENCE OF SHORT CODES
    this.field.addEventListener('input', function(e) {
        let text = e.target.innerHTML;

        for (let emojiIndex in emojisObj.emojis) {
            if (text.includes(emojisObj.emojis[emojiIndex]['shortcode'])) {
                // If there is a key phrase in the text field,
                // it is replaced by an image
                e.target.innerHTML = text.replace(emojisObj.emojis[emojiIndex]['shortcode'],
                    // emojiTag returns an emoji element, outerHTML converts it to a string
                    emojisObj.emojiTag(emojisObj.emojis[emojiIndex]['path'], emojisObj.emojis[emojiIndex]['alt']).outerHTML);

                moveCursor(); // Move the input cursor to the end
            }
        }
    });

    // // // //
    // Utils //
    // // // //

    // MOVE INPUT CURSOR TO END OF LINE
    const moveCursor = () => {
        // Method to move the input cursor to the end of the input

        const sel = window.getSelection();
        sel.removeAllRanges();

        // Creates a new range
        const range = document.createRange();
        range.selectNodeContents(this.field); // Selects all content from a div
        range.collapse(false); // false means that the range will be pushed to the end of the content

        // Adds a range to the selection
        sel.addRange(range);

        // Switch the focus to the div so that the user can see the cursor moving
        this.field.focus();
    }

    // INSERT UNFORMATTED TEXT
    this.field.addEventListener('paste', function (e) {
        // Stop the standard handling of the insert event
        e.preventDefault();

        // Get text from clipboard as plain text
        let text = (e.originalEvent || e).clipboardData.getData('text/plain');

        // Insert plain text without formatting
        document.execCommand("insertHTML", false, text);
    });

    // CHECK TEXT FOR ILLEGAL TAGS
    this.field.addEventListener('input', function (e) {
        const allowedTags = ['IMG']; // Tags are allowed
        const nodes = Array.from(e.target.childNodes); // Get all child nodes

        nodes.forEach(node => {
            // If the node is not a text node and is not in the list of allowed tags
            if (node.nodeType !== Node.TEXT_NODE
                && (!allowedTags.includes(node.nodeName) || !node.classList.contains('svg-emoji'))
            ) {
                node.parentNode.removeChild(node); // Delete the node
            }
        });
    });

}