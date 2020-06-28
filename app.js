// select main diagram container
const diagramContainer = document.getElementById("diagram-container");
// select main pool shape
const mainPool = document.querySelector("#main-pool");
// select step shape
const sideStep = document.querySelector("#side-step");
// select roller shape
const roller = document.querySelector("#roller");
const rollerSvg = document.querySelector("#roller-svg");
const rollerSvgContent = rollerSvg.innerHTML;
// select pool's length and width
const poolLengthSelector = document.getElementById("pool-length");
const poolWidthSelector = document.getElementById("pool-width");
// select side step length
const stepLengthSelector = document.getElementById("step-length");
// select side step width
const stepWidthSelector = document.getElementById("step-width");
// select side step visibility
const sideStepVisibilitySelector = document.getElementById(
  "side-step-visibility"
);
// select side step orientation selector
const sideStepOrientationSelector = document.getElementById(
  "side-step-orientation"
);
// select roller needed selector
const rollerNeededSelector = document.getElementById("need-roller");
// select roller visibility selector
const rollerVisibilitySelector = document.getElementById("show-roller");
// roller horizontal distance
const rollerHorizontalDistance = getComputedStyle(
  document.body
).getPropertyValue("--roller-horizontal-distance");
// roller vertical extension
const rollerVerticalExtension = parseInt(
  getComputedStyle(document.body)
    .getPropertyValue("--roller-vertical-extension")
    .slice(0, -2)
);
// select left dimension
const leftDimension = document.getElementById("left-dimension");
// select right dimension
const rightDimension = document.getElementById("right-dimension");
// select top dimension
const topDimension = document.getElementById("top-dimension");
// select bottom dimension
const bottomDimension = document.getElementById("bottom-dimension");
// select side step vertical dimension
const sideStepVerticalDimension = document.getElementById("side-dimension");
const sideStepDimensionTextBox = sideStepVerticalDimension.querySelector(
  ".text-box p"
);
//select side-step vertial dimension margin value
const sideStepMargin = getComputedStyle(document.body).getPropertyValue(
  "--dimension-block-offset"
);
// get default values from selectors
const defaultValue = (selector) =>
  selector.options[selector.selectedIndex].value;
let poolLength = parseInt(defaultValue(poolLengthSelector));
let poolWidth = parseInt(defaultValue(poolWidthSelector));
let stepLength = parseInt(defaultValue(stepLengthSelector));
let stepWidth = parseInt(defaultValue(stepWidthSelector));
let sideStepVisibility = defaultValue(sideStepVisibilitySelector);
let sideStepOrientation = defaultValue(sideStepOrientationSelector);
let rollerNeeded = defaultValue(rollerNeededSelector);
let rollerVisibility = defaultValue(rollerVisibilitySelector);

const render = () => {
  // get pools width in pixels from dom and find scale factor
  const poolLengthInPixel = mainPool.getBoundingClientRect().width;
  const scaleFactor = poolLengthInPixel / poolLength;
  // set pool's length and width
  mainPool.style.height = `${poolWidth * scaleFactor}px`;
  // set step length and width
  sideStep.style.width = `${stepLength * scaleFactor}`;
  sideStep.style.height = `${stepWidth * scaleFactor}`;
  // set visibility of side step and height of dimension blocks

  if (sideStepVisibility === "no") {
    sideStep.style.display = "none";
    rightDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.style.height = `${poolWidth * scaleFactor}px`;
    topDimension.style.width = "100%";
    topDimension.querySelector(".text-box p").innerText = `${poolLength}m`;
    leftDimension.querySelector(".text-box p").innerText = `${poolWidth}m`;
    rightDimension.querySelector(".text-box p").innerText = `${poolWidth}m`;
    bottomDimension.querySelector(".text-box p").innerText = `${
      poolLength + 0.2
    }m`;
    rightDimension.querySelector(".text-box p").innerText = `${
      poolWidth + 0.2
    }m`;
    bottomDimension.classList.add("blue-dimension-horizontal");
    bottomDimension.style.transform = `scaleX(1.04)`;
    rightDimension.classList.add("blue-dimension-vertical");
    rightDimension.style.transform = `scaleY(1.04)`;
    sideStepVerticalDimension.style.display = "none";
  } else if (sideStepVisibility === "yes") {
    sideStep.style.display = "block";
    topDimension.style.width = `${stepLength * scaleFactor}px`;
    sideStepVerticalDimension.style.height = `${stepWidth * scaleFactor}px`;
    bottomDimension.querySelector(".text-box p").innerText = `${poolLength}m`;
    topDimension.querySelector(".text-box p").innerText = `${stepLength}m`;
    bottomDimension.classList.remove("blue-dimension-horizontal");
    bottomDimension.style.transform = `scaleX(1)`;
    rightDimension.classList.remove("blue-dimension-vertical");
    rightDimension.style.transform = `scaleY(1)`;
    sideStepVerticalDimension.style.display = "flex";
    sideStepVerticalDimension.querySelector(
      ".text-box p"
    ).innerText = `${stepWidth}m`;
  }
  // set sidestep orientation and dimensions
  if (sideStepOrientation === "right" && sideStepVisibility === "yes") {
    sideStep.style.alignSelf = "flex-end";
    leftDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.querySelector(".text-box p").innerText = `${poolWidth}m`;
    rightDimension.style.height = `${(poolWidth + stepWidth) * scaleFactor}px`;
    rightDimension.querySelector(".text-box p").innerText = `${
      poolWidth + stepWidth
    }m`;
    topDimension.style.justifySelf = "flex-end";
    sideStepVerticalDimension.style.marginLeft = "0px";
    sideStepVerticalDimension.style.marginRight = `${sideStepMargin}`;
    sideStepVerticalDimension.style.left = `auto`;
    sideStepVerticalDimension.style.right = `${stepLength * scaleFactor}px`;
    sideStepDimensionTextBox.style.marginRight = "30px";
    sideStepDimensionTextBox.style.marginLeft = "0px";
  } else if (sideStepOrientation === "left" && sideStepVisibility === "yes") {
    sideStep.style.alignSelf = "flex-start";
    rightDimension.style.height = `${poolWidth * scaleFactor}px`;
    rightDimension.querySelector(".text-box p").innerText = `${poolWidth}m`;
    leftDimension.style.height = `${(poolWidth + stepWidth) * scaleFactor}px`;
    leftDimension.querySelector(".text-box p").innerText = `${
      poolWidth + stepWidth
    }m`;
    topDimension.style.justifySelf = "flex-start";
    sideStepVerticalDimension.style.marginRight = "0px";
    sideStepVerticalDimension.style.marginLeft = `${sideStepMargin}`;
    sideStepVerticalDimension.style.left = `${stepLength * scaleFactor}px`;
    sideStepDimensionTextBox.style.marginRight = "0px";
    sideStepDimensionTextBox.style.marginLeft = "35px";
  } else if (sideStepOrientation === "centre" && sideStepVisibility === "yes") {
    sideStep.style.alignSelf = "center";
    rightDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.querySelector(".text-box p").innerText = `${poolWidth}m`;
    rightDimension.querySelector(".text-box p").innerText = `${poolWidth}m`;
    topDimension.style.justifySelf = "center";
    sideStepVerticalDimension.style.marginRight = "0px";
    sideStepVerticalDimension.style.marginLeft = `${sideStepMargin}`;
    sideStepVerticalDimension.style.left = `calc(50% + ${
      (stepLength * scaleFactor) / 2
    }px)`;
  }
  // set roller needed value
  if (rollerNeeded === "yes") {
    roller.style.display = "flex";
  } else if (rollerNeeded === "no") {
    roller.style.display = "none";
  }
  // set roller visibility
  if (rollerVisibility === "left") {
    diagramContainer.style.flexDirection = "row-reverse";
  } else if (rollerVisibility === "right") {
    diagramContainer.style.flexDirection = "row";
  } else if (rollerVisibility === "hidden") {
    roller.style.display = "none";
  }
  // re render roller
  rollerSvg.innerHTML = "";
  rollerSvg.innerHTML = rollerSvgContent;
  // set height of roller
  roller.style.height = `${
    poolWidth * scaleFactor + rollerVerticalExtension * 2
  }px`;
  roller.querySelector("#roller-text-box p span").innerText = `${
    poolWidth + 0.3
  }m`;
  if (sideStepVisibility === "yes") {
    if (
      (rollerVisibility === "right" && sideStepOrientation === "right") ||
      (rollerVisibility === "left" && sideStepOrientation === "left")
    ) {
      roller.style.height = `${
        (poolWidth + stepWidth) * scaleFactor + rollerVerticalExtension * 2
      }px`;
      roller.querySelector("#roller-text-box p span").innerText = `${
        poolWidth + stepWidth + 0.3
      }m`;
    }
  }
  // add margin to roller
  if (rollerVisibility === "right") {
    roller.classList.add("roller-left-margin");
    roller.classList.remove("roller-right-margin");
    roller.style.flexDirection = "row";
  } else if (rollerVisibility === "left") {
    roller.classList.add("roller-right-margin");
    roller.classList.remove("roller-left-margin");
    roller.style.flexDirection = "row-reverse";
  }
};

render();

// add event listeners
sideStepVisibilitySelector.addEventListener("change", (event) => {
  sideStepVisibility = event.target.value;
  render();
});
poolLengthSelector.addEventListener("change", (event) => {
  poolLength = parseInt(event.target.value);
  render();
});
poolWidthSelector.addEventListener("change", (event) => {
  poolWidth = parseInt(event.target.value);
  render();
});
stepLengthSelector.addEventListener("change", (event) => {
  stepLength = parseInt(event.target.value);
  render();
});
stepWidthSelector.addEventListener("change", (event) => {
  stepWidth = parseInt(event.target.value);
  render();
});
sideStepOrientationSelector.addEventListener("change", (event) => {
  sideStepOrientation = event.target.value;
  render();
});
rollerNeededSelector.addEventListener("change", (event) => {
  rollerNeeded = event.target.value;
  render();
});
rollerVisibilitySelector.addEventListener("change", (event) => {
  rollerVisibility = event.target.value;
  render();
});
