// select main diagram container
const diagramContainer = document.getElementById("diagram-container");
// select main pool shape
const mainPool = document.querySelector("#main-pool");
// select step shape
const sideStep = document.querySelector("#side-step");
// select roller shape
const roller = document.querySelector("#roller");
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

// get default values from selectors
let poolLength =
  poolLengthSelector.options[poolLengthSelector.selectedIndex].value;
let poolWidth =
  poolWidthSelector.options[poolWidthSelector.selectedIndex].value;
let stepLength =
  stepLengthSelector.options[stepLengthSelector.selectedIndex].value;
let stepWidth =
  stepWidthSelector.options[stepWidthSelector.selectedIndex].value;
let sideStepVisibility =
  sideStepVisibilitySelector.options[sideStepVisibilitySelector.selectedIndex]
    .value;
let sideStepOrientation =
  sideStepOrientationSelector.options[sideStepOrientationSelector.selectedIndex]
    .value;
let rollerNeeded =
  rollerNeededSelector.options[rollerNeededSelector.selectedIndex].value;
let rollerVisibility =
  rollerVisibilitySelector.options[rollerVisibilitySelector.selectedIndex]
    .value;

const render = () => {
  // get pools width in pixels from dom and find scale factor
  const poolLengthInPixel = mainPool.getBoundingClientRect().width;
  const scaleFactor = poolLengthInPixel / poolLength;
  // set pool's length and width
  mainPool.style.height = `${poolWidth * scaleFactor}px`;
  // set step length and width
  sideStep.style.width = `${stepLength * scaleFactor}`;
  sideStep.style.height = `${stepWidth * scaleFactor}`;
  // set visibility of side step
  if (sideStepVisibility === "no") {
    sideStep.style.display = "none";
  } else if (sideStepVisibility === "yes") {
    sideStep.style.display = "block";
  }
  // set sidestep orientation
  if (sideStepOrientation === "right") {
    sideStep.style.alignSelf = "flex-end";
  } else if (sideStepOrientation === "left") {
    sideStep.style.alignSelf = "flex-start";
  } else if (sideStepOrientation === "centre") {
    sideStep.style.alignSelf = "center";
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
  }
};

render();

// add event listeners
sideStepVisibilitySelector.addEventListener("change", (event) => {
  sideStepVisibility = event.target.value;
  render();
});
poolLengthSelector.addEventListener("change", (event) => {
  poolLength = event.target.value;
  render();
});
poolWidthSelector.addEventListener("change", (event) => {
  poolWidth = event.target.value;
  render();
});
stepLengthSelector.addEventListener("change", (event) => {
  stepLength = event.target.value;
  render();
});
stepWidthSelector.addEventListener("change", (event) => {
  stepWidth = event.target.value;
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
