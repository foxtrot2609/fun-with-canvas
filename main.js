/* Variables */

const canvas = document.getElementById("draw");
const fieldset = document.querySelector(".fieldset");
const btnClear = document.querySelector(".clear");
const btnAuto = document.querySelector(".auto");
const color = fieldset.querySelector(".color");
const range = fieldset.querySelector(".line-width");
const manual = fieldset.querySelector(".manual");
const input = fieldset.querySelectorAll("[data-ctx]");

/* get the rendering context and its drawing functions (получаем контекст визуализации и ее функции рисования) */
const ctx = canvas.getContext("2d");
/* set canvas size to window size */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/* appearance of the "corners" where the lines meet (внешний вид «углов», где встречаются линии) */
ctx.lineJoin = "round";
/* appearance of line ends (внешний вид концов линий) */
ctx.lineCap = "round";
/* line width */
let penWidth = 1;
let autoOn = true;

/* line color */
let hue = 0;
let lineDirection = true;
/* drawing or not drawing */
let isDrawing = false;
/* last position */
let [lastX, lastY] = [0, 0];

/* Functions */

const draw = (e) => {
  if (!isDrawing) return;
  ctx.beginPath(); // begin of drawing
  ctx.moveTo(lastX, lastY); // move pen to line start
  ctx.lineTo(e.offsetX, e.offsetY); // end of line
  ctx.stroke(); // end drawing
  [lastX, lastY] = [e.offsetX, e.offsetY];

  if (autoOn) {
    /* line width auto */
    if (penWidth === 100 || penWidth === 0) {
      lineDirection = !lineDirection;
    }

    if (lineDirection) {
      penWidth++;
    } else {
      penWidth--;
    }

    ctx.lineWidth = penWidth;
    range.value = ctx.lineWidth;

    /* line color */
    if (hue >= 360) {
      hue = 0;
    }
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    color.value = ctx.strokeStyle;
    hue++;
  }
};

function changeValue(e) {
  autoOn = false;
  fieldset.classList.remove("off");
  manual.textContent = "manual settings (ON)";
  btnAuto.classList.add("off");
  btnAuto.textContent = "auto (off)";
  ctx[this.dataset.ctx] = e.target.value;
}

const turnOnAuto = () => {
  autoOn = true;
  fieldset.classList.add("off");
  manual.textContent = "manual settings (OFF)";
  btnAuto.classList.remove("off");
  btnAuto.textContent = "auto (on)";
};

const clearAll = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const startDrawing = (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
};

const endDrawing = () => (isDrawing = false);

/* Listeners */

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", endDrawing);
btnClear.addEventListener("click", clearAll);
btnAuto.addEventListener("click", turnOnAuto);
input.forEach((inp) => inp.addEventListener("change", changeValue));
input.forEach((inp) => inp.addEventListener("click", changeValue));
