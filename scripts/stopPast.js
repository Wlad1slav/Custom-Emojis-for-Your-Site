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

    inputFields[i].addEventListener('input', function (e) {
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