import {inputFields} from './inputFields.js';


for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener('input', function(e) {
        // Validating the text inside each div with the with-own-emoji class
        let text = e.target.innerHTML;
        if (text.includes("[your_phrase]")) {
            // If there is a key phrase in the text field,
            // it is replaced by an SVG image
            e.target.innerHTML = text.replace("[your_phrase]",
                `<img src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg" class="svg-emoji"  alt=":australia:"/>`);
        }
    });
}