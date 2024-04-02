export const inputFields = document.getElementsByClassName('with-own-emoji');

export const emojiTag = (path, alt) => {
    return `<img src="${path}" class="svg-emoji" alt="${alt}">`;
}