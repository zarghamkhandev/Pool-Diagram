// select main pool shape
const mainPool = document.querySelector("#main-pool");
// select step shape
const sideStep = document.querySelector("#side-step");
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

// get default values from selectors
let poolLength =
  poolLengthSelector.options[poolLengthSelector.selectedIndex].value;
let poolWidth =
  poolWidthSelector.options[poolWidthSelector.selectedIndex].value;
const stepLength =
  stepLengthSelector.options[stepLengthSelector.selectedIndex].value;
const stepWidth =
  stepWidthSelector.options[stepWidthSelector.selectedIndex].value;
let sideStepVisibility =
  sideStepVisibilitySelector.options[sideStepVisibilitySelector.selectedIndex]
    .value;

// get pools width in pixels from dom and find scale factor
const poolLengthInPixel = mainPool.clientWidth;
const scaleFactor = poolLengthInPixel / poolLength;

const render = () => {
  // set pool's width
  const poolRatio = ((poolWidth / poolLength) * 100).toFixed();
  mainPool.style.paddingBottom = `${poolRatio}%`;

  // set visibility of side step
  if (sideStepVisibility === "no") {
    sideStep.style.display = "none";
  } else if (sideStepVisibility === "yes") {
    sideStep.style.display = "block";
  }

  // set step length and width
  sideStep.style.width = `${stepLength * scaleFactor}`;
  sideStep.style.height = `${stepWidth * scaleFactor}`;
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
