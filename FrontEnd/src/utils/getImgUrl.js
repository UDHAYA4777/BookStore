function getImgUrl(name) {
    return new URL(`../assets/books/book/${name}`, import.meta.url)
}

export { getImgUrl }