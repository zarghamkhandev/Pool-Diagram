// select main diagram container
const diagramContainer = document.getElementById("diagram-container");
// select main pool shape
const mainPool = document.querySelector("#main-pool");
// select step shape
const sideStep = document.querySelector("#side-step");
// select roller shape
const roller = document.querySelector("#roller");
const rollerSvg = document.querySelector("#roller-svg");
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
// select left dimension
const leftDimension = document.getElementById("left-dimension");
// select right dimension
const rightDimension = document.getElementById("right-dimension");
//
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
  } else if (sideStepVisibility === "yes") {
    sideStep.style.display = "block";
  }
  // set sidestep orientation and dimensions height
  if (sideStepOrientation === "right" && sideStepVisibility === "yes") {
    sideStep.style.alignSelf = "flex-end";
    leftDimension.style.height = `${poolWidth * scaleFactor}px`;
    console.log(typeof stepWidth);
    rightDimension.style.height = `${(poolWidth + stepWidth) * scaleFactor}px`;
  } else if (sideStepOrientation === "left" && sideStepVisibility === "yes") {
    sideStep.style.alignSelf = "flex-start";
    rightDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.style.height = `${(poolWidth + stepWidth) * scaleFactor}px`;
  } else if (sideStepOrientation === "centre" && sideStepVisibility === "yes") {
    sideStep.style.alignSelf = "center";
    rightDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.style.height = `${poolWidth * scaleFactor}px`;
  }
  // set roller needed value
  if (rollerNeeded === "yes") {
    roller.style.display = "block";
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
  roller.innerHTML = "";
  roller.appendChild(rollerSvg);
  // set height of roller
  roller.style.height = `${(poolWidth + 0.3) * scaleFactor}px`;
  if (sideStepVisibility === "yes") {
    if (
      (rollerVisibility === "right" && sideStepOrientation === "right") ||
      (rollerVisibility === "left" && sideStepOrientation === "left")
    ) {
      roller.style.height = `${(poolWidth + stepWidth + 0.3) * scaleFactor}px`;
    }
  }
  // add margin to roller
  if (rollerVisibility === "right") {
    roller.style.marginLeft = rollerHorizontalDistance;
    roller.style.marginRight = "0px";
  } else if (rollerVisibility === "left") {
    roller.style.marginRight = rollerHorizontalDistance;
    roller.style.marginLeft = "0px";
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
