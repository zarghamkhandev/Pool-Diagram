const mainPool = document.querySelector("#main-pool");

const poolLength = 8.2;
const poolWidth = 6;

const poolRatio = ((poolWidth / poolLength) * 100).toFixed();
console.log(poolRatio);

mainPool.style.paddingBottom = `${poolRatio}%`;
