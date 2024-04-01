let bodyText = document.body;

if (bodyText.innerHTML.includes("[your_phrase]")) {
    bodyText.innerHTML = bodyText.innerHTML.replace(/\[your_phrase\]/g,
        `<img src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg" class="svg-emoji"  alt=":australia:"/>`);
}