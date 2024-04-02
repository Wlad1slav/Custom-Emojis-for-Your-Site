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