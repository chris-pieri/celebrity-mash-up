export function preloadImages(photoUrls) {
  photoUrls.forEach((url) => {
    const image = new Image();
    image.src = url;
  });
}
