var currentMainImageIndex = 0;

export function createCarouselArrow(direction, itemListingImages) {
  direction = direction.toLowerCase();
  const arrow = document.createElement("div");
  arrow.className = `carousel-button carousel-button-${direction}`;
  arrow.onclick = () => {
    setMainImageToNext(direction, itemListingImages);
  };

  const img = document.createElement("img");
  img.src = `../../assets/itemListing/green-chevron-${direction}.svg`;
  img.alt = `${direction} pointing arrow`;

  arrow.appendChild(img);
  return arrow;
}

function setMainImageToNext(direction, itemListingImages) {
  const imageListLength = itemListingImages.length;
  handleCurrentImageIndexChange(direction, imageListLength);
  setMainImage(itemListingImages[currentMainImageIndex], currentMainImageIndex);
}

function handleCurrentImageIndexChange(direction, imageListLength) {
  var newMainImageIndex =
    direction === "left"
      ? currentMainImageIndex - 1
      : currentMainImageIndex + 1;
  if (isNewIndexWithinImagesRange(newMainImageIndex, imageListLength)) {
    currentMainImageIndex = newMainImageIndex;
  }
}

function isNewIndexWithinImagesRange(newMainImageIndex, imageListLength) {
  return newMainImageIndex >= 0 && newMainImageIndex <= imageListLength - 1;
}

export function createSmallerImages(parentElement, itemListingImages) {
  itemListingImages.forEach((imgUrl, index) => {
    parentElement.appendChild(createSmallerImage(imgUrl, index));
  });
}

function createSmallerImage(imgUrl, index) {
  const imgDiv = document.createElement("div");
  imgDiv.className = "carousel-image";
  imgDiv.style.backgroundImage = `url("${imgUrl}")`;
  imgDiv.setAttribute("imgindex", index);
  imgDiv.onclick = (event) => {
    var imgIndex = getCarouselImageIndex(event);
    setMainImage(imgUrl, imgIndex);
  };
  return imgDiv;
}

function getCarouselImageIndex(event) {
  return event.target.attributes.imgindex.value;
}

export function setMainImage(image, imgIndex) {
  currentMainImageIndex = imgIndex;
  const imageDiv = document.getElementById("main-image");
  imageDiv.style.backgroundImage = `url("${image}")`;
}
