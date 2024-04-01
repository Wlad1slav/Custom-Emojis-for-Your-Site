import {inputFields} from './inputFields.js';

for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener('paste', function (e) {
        // Stop the standard handling of the insert event
        e.preventDefault();

        // Get text from clipboard as plain text
        let text = (e.originalEvent || e).clipboardData.getData('text/plain');

        // Insert plain text without formatting
        document.execCommand("insertHTML", false, text);
    });
}