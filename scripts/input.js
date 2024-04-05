export const inputFields = document.getElementsByClassName('with-own-emoji');

export const emojiTag = (path, alt) => {
    // Returns an emoji element
    const emoji = document.createElement('img');
    emoji.src = path;
    emoji.classList.add('svg-emoji');
    emoji.alt = alt;

    return emoji;
}