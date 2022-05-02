const NEW_ESSENTIALS_ROOT = document.getElementById("newCarEssentialsRoot");

export function renderEssentialsTiles() {
  NEW_CAR_ESSENTIALS_LIST.forEach((essentialItem) => {
    NEW_ESSENTIALS_ROOT.appendChild(
      createEssentialTileComponent(essentialItem)
    );
  });
}

function createEssentialTileComponent(essentialItem) {
  const responsiveContainer = document.createElement("div");
  responsiveContainer.className = "col-sm-8 col-md-6 col-lg-3";

  const tileContianer = document.createElement("div");
  tileContianer.className = "info-tile";

  const anchorLink = document.createElement("a");
  anchorLink.target = "_blank"
  anchorLink.href = essentialItem.link;

  const tileImg = document.createElement("div");
  tileImg.className = "info-tile-img";
  tileImg.style.backgroundImage = `url("${essentialItem.img}")`;

  const tileText = document.createElement("p");
  tileText.innerHTML = essentialItem.title;

  responsiveContainer.appendChild(tileContianer);
  tileContianer.appendChild(anchorLink);
  anchorLink.appendChild(tileImg);
  anchorLink.appendChild(tileText);

  return responsiveContainer;
}
