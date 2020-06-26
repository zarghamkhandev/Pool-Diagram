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
const defaultValue = (selector) =>
  selector.options[selector.selectedIndex].value;
let poolLength = defaultValue(poolLengthSelector);
let poolWidth = defaultValue(poolWidthSelector);
let stepLength = defaultValue(stepLengthSelector);
let stepWidth = defaultValue(stepWidthSelector);
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
  } else if (rollerVisibility === "hidden") {
    roller.style.display = "none";
  }
  // set height of roller
  if (
    (rollerVisibility === "right" && sideStepOrientation !== "right") ||
    (rollerVisibility === "left" && sideStepOrientation !== "left")
  ) {
    roller.style.height = `${(parseInt(poolWidth) + 0.3) * scaleFactor}px`;
    roller.style.marginBottom = `${-(0.3 * scaleFactor) / 2}px`;
  } else if (
    (rollerVisibility === "right" && sideStepOrientation === "right") ||
    (rollerVisibility === "left" && sideStepOrientation === "left")
  ) {
    roller.style.height = `${
      (parseInt(poolWidth) + parseInt(stepWidth) + 0.3) * scaleFactor
    }px`;
    roller.style.marginBottom = `${-(0.3 * scaleFactor) / 2}px`;
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
