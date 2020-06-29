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
const rollerVerticalExtension = parseFloat(
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
const sideStepVerticalDimensionAlt = document.getElementById(
  "side-dimension-alt"
);
const sideStepHorizontalDimension = document.getElementById(
  "side-dimension-horizontal"
);
const sideStepDimensionTextBox = sideStepVerticalDimension.querySelector(
  ".text-box p"
);
//select side-step vertial dimension margin value
const sideStepMargin = parseFloat(
  getComputedStyle(document.body)
    .getPropertyValue("--dimension-block-offset")
    .slice(0, -2)
);
const dimensionBlockWidth = parseFloat(
  getComputedStyle(document.body)
    .getPropertyValue("--dimension-block-width")
    .slice(0, -2)
);
const horizontalBreakpoint = parseFloat(
  getComputedStyle(document.body)
    .getPropertyValue("--horizontal-breakpoint")
    .slice(0, -2)
);
const verticalBreakpoint = parseFloat(
  getComputedStyle(document.body)
    .getPropertyValue("--vertical-breakpoint")
    .slice(0, -2)
);

// get default values from selectors
const defaultValue = (selector) =>
  selector.options[selector.selectedIndex].value;
let poolLength = +parseFloat(defaultValue(poolLengthSelector)).toFixed(1);
let poolWidth = +parseFloat(defaultValue(poolWidthSelector)).toFixed(1);
let stepLength = +parseFloat(defaultValue(stepLengthSelector)).toFixed(1);
let stepWidth = +parseFloat(defaultValue(stepWidthSelector)).toFixed(1);
let sideStepVisibility = defaultValue(sideStepVisibilitySelector);
let sideStepOrientation = defaultValue(sideStepOrientationSelector);
let rollerNeeded = defaultValue(rollerNeededSelector);
let rollerVisibility = defaultValue(rollerVisibilitySelector);

const render = () => {
  if (stepLength > poolLength) {
    return;
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
  // get pools width in pixels from dom and find scale factor
  const poolLengthInPixel = mainPool.getBoundingClientRect().width;
  const scaleFactor = (poolLengthInPixel / poolLength).toFixed(1);

  // set pool's length and width
  mainPool.style.height = `${poolWidth * scaleFactor}px`;
  // set step length and width
  sideStep.style.width = `${stepLength * scaleFactor}`;
  sideStep.style.height = `${stepWidth * scaleFactor}`;

  const edgeLength = +(((poolLength - stepLength) / 2) * scaleFactor).toFixed(
    2
  );
  // set visibility of side step and height of dimension blocks
  if (sideStepVisibility === "no") {
    sideStep.style.display = "none";
    rightDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.style.height = `${poolWidth * scaleFactor}px`;
    topDimension.style.width = "100%";
    topDimension.querySelector(".text-box p").innerText = `${poolLength.toFixed(
      1
    )}m`;
    leftDimension.querySelector(".text-box p").innerText = `${poolWidth.toFixed(
      1
    )}m`;
    rightDimension.querySelector(
      ".text-box p"
    ).innerText = `${poolWidth.toFixed(1)}m`;
    bottomDimension.querySelector(".text-box p").innerText = `${(
      poolLength + 0.2
    ).toFixed(1)}m`;
    rightDimension.querySelector(".text-box p").innerText = `${(
      poolWidth + 0.2
    ).toFixed(1)}m`;
    bottomDimension.classList.add("blue-dimension-horizontal");
    bottomDimension.style.transform = `scaleX(1.04)`;
    rightDimension.classList.add("blue-dimension-vertical");
    rightDimension.style.transform = `scaleY(1.04)`;
    sideStepVerticalDimension.style.display = "none";
    sideStepVerticalDimensionAlt.style.display = "none";
  } else if (sideStepVisibility === "yes") {
    sideStep.style.display = "block";
    topDimension.style.width = `${stepLength * scaleFactor}px`;
    leftDimension.querySelector(".text-box p").innerText = `${poolWidth.toFixed(
      1
    )}m`;
    bottomDimension.querySelector(
      ".text-box p"
    ).innerText = `${poolLength.toFixed(1)}m`;
    topDimension.querySelector(".text-box p").innerText = `${stepLength.toFixed(
      1
    )}m`;
    bottomDimension.classList.remove("blue-dimension-horizontal");
    bottomDimension.style.transform = `scaleX(1)`;
    rightDimension.classList.remove("blue-dimension-vertical");
    rightDimension.style.transform = `scaleY(1)`;
    sideStepVerticalDimension.style.height = `${stepWidth * scaleFactor}px`;
    sideStepVerticalDimensionAlt.style.height = `${
      stepWidth * scaleFactor - 5
    }px`;
    if (stepWidth * scaleFactor < verticalBreakpoint) {
      sideStepVerticalDimension.style.display = "none";
      sideStepVerticalDimensionAlt.style.display = "flex";
    } else {
      sideStepVerticalDimension.style.display = "flex";
      sideStepVerticalDimensionAlt.style.display = "none";
    }

    if (edgeLength < horizontalBreakpoint) {
      sideStepHorizontalDimension.style.height = `${
        stepWidth * scaleFactor - 5
      }px`;
      sideStepHorizontalDimension.style.left = `${
        ((poolLength - stepLength) / 2 + stepLength) * scaleFactor + 5
      }`;
      sideStepHorizontalDimension.style.width = `${
        ((poolLength - stepLength) / 2) * scaleFactor - 5
      }`;
      sideStepHorizontalDimension.style.top = "0";
      sideStepHorizontalDimension.classList.add("hide-dimension-content");
      sideStepHorizontalDimension.classList.add("right-border");
    } else {
      sideStepHorizontalDimension.style.top = `${
        stepWidth * scaleFactor - sideStepMargin - dimensionBlockWidth
      }px`;
      sideStepHorizontalDimension.style.left = `${
        ((poolLength - stepLength) / 2 + stepLength) * scaleFactor
      }`;
      sideStepHorizontalDimension.style.width = `${
        ((poolLength - stepLength) / 2) * scaleFactor
      }`;
      sideStepHorizontalDimension.style.height = `${dimensionBlockWidth}`;
      sideStepHorizontalDimension.classList.remove("hide-dimension-content");
      sideStepHorizontalDimension.classList.remove("right-border");
    }
    sideStepHorizontalDimension.style.display = "flex";
    sideStepVerticalDimension.querySelector(
      ".text-box p"
    ).innerText = `${stepWidth.toFixed(1)}m`;
    sideStepVerticalDimensionAlt.querySelector(
      ".text-box p"
    ).innerText = `${stepWidth.toFixed(1)}m`;
    sideStepHorizontalDimension.querySelector(".text-box p").innerText = `${(
      (poolLength - stepLength) /
      2
    ).toFixed(1)}m`;
  }
  // set sidestep orientation and dimensions
  if (sideStepOrientation === "right" && sideStepVisibility === "yes") {
    sideStep.style.alignSelf = "flex-end";
    leftDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.querySelector(".text-box p").innerText = `${poolWidth.toFixed(
      1
    )}m`;
    rightDimension.style.height = `${(poolWidth + stepWidth) * scaleFactor}px`;
    rightDimension.querySelector(".text-box p").innerText = `${(
      poolWidth + stepWidth
    ).toFixed(1)}m`;
    topDimension.style.justifySelf = "flex-end";
    sideStepVerticalDimension.style.left = `${
      (poolLength - stepLength) * scaleFactor -
      sideStepMargin -
      dimensionBlockWidth
    }px`;
    sideStepVerticalDimensionAlt.style.left = `${
      (poolLength - stepLength) * scaleFactor - 25
    }px`;
    sideStepVerticalDimensionAlt.classList.add("left-border");
    sideStepVerticalDimensionAlt.classList.remove("right-border");
    sideStepVerticalDimensionAlt.querySelector(".text-box").style.marginLeft =
      "-38px";
    sideStepDimensionTextBox.style.marginLeft = "-35px";
    sideStepHorizontalDimension.style.display = "none";
  } else if (sideStepOrientation === "left" && sideStepVisibility === "yes") {
    sideStep.style.alignSelf = "flex-start";
    rightDimension.style.height = `${poolWidth * scaleFactor}px`;
    rightDimension.querySelector(
      ".text-box p"
    ).innerText = `${poolWidth.toFixed(1)}m`;
    leftDimension.style.height = `${(poolWidth + stepWidth) * scaleFactor}px`;
    leftDimension.querySelector(".text-box p").innerText = `${(
      poolWidth + stepWidth
    ).toFixed(1)}m`;
    topDimension.style.justifySelf = "flex-start";
    sideStepVerticalDimension.style.left = `${
      stepLength * scaleFactor + sideStepMargin
    }px`;
    sideStepVerticalDimensionAlt.style.left = `${
      stepLength * scaleFactor + 5
    }px`;
    sideStepVerticalDimensionAlt.querySelector(".text-box").style.marginLeft =
      "25px";
    sideStepVerticalDimensionAlt.classList.remove("left-border");
    sideStepVerticalDimensionAlt.classList.add("right-border");
    sideStepDimensionTextBox.style.marginLeft = "20px";
    sideStepHorizontalDimension.style.display = "none";
  } else if (sideStepOrientation === "centre" && sideStepVisibility === "yes") {
    sideStep.style.alignSelf = "center";
    rightDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.style.height = `${poolWidth * scaleFactor}px`;
    leftDimension.querySelector(".text-box p").innerText = `${poolWidth.toFixed(
      1
    )}m`;
    rightDimension.querySelector(
      ".text-box p"
    ).innerText = `${poolWidth.toFixed(1)}m`;
    topDimension.style.justifySelf = "center";
    sideStepVerticalDimension.style.left = `${
      ((poolLength - stepLength) / 2) * scaleFactor -
      sideStepMargin -
      dimensionBlockWidth
    }px`;
    sideStepVerticalDimensionAlt.style.left = `${
      ((poolLength - stepLength) / 2) * scaleFactor - 25
    }px`;
    sideStepVerticalDimensionAlt.classList.remove("right-border");
    sideStepVerticalDimensionAlt.classList.add("left-border");
    sideStepVerticalDimensionAlt.querySelector(".text-box").style.marginLeft =
      "-38px";
    sideStepDimensionTextBox.style.marginLeft = "-35px";
  }

  // re render roller
  rollerSvg.innerHTML = "";
  rollerSvg.innerHTML = rollerSvgContent;
  // set height of roller
  roller.style.height = `${
    poolWidth * scaleFactor + rollerVerticalExtension * 2
  }px`;
  roller.querySelector("#roller-text-box p span").innerText = `${(
    poolWidth + 0.3
  ).toFixed(1)}m`;
  if (sideStepVisibility === "yes") {
    if (
      (rollerVisibility === "right" && sideStepOrientation === "right") ||
      (rollerVisibility === "left" && sideStepOrientation === "left")
    ) {
      roller.style.height = `${
        (poolWidth + stepWidth) * scaleFactor + rollerVerticalExtension * 2
      }px`;
      roller.querySelector("#roller-text-box p span").innerText = `${(
        poolWidth +
        stepWidth +
        0.3
      ).toFixed(1)}m`;
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
  poolLength = +parseFloat(event.target.value).toFixed(1);
  render();
});
poolWidthSelector.addEventListener("change", (event) => {
  poolWidth = +parseFloat(event.target.value).toFixed(1);
  render();
});
stepLengthSelector.addEventListener("change", (event) => {
  stepLength = +parseFloat(event.target.value).toFixed(1);
  render();
});
stepWidthSelector.addEventListener("change", (event) => {
  stepWidth = +parseFloat(event.target.value).toFixed(1);
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
