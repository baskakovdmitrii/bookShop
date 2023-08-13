export function getRandomImage() {
    const imageContext = require.context('@/assets/img/', false, /\.jpg$/);
    const imageKeys = imageContext.keys();
    const randomIndex = Math.floor(Math.random() * imageKeys.length);
    return imageContext(imageKeys[randomIndex]);
}