const canvas = document.getElementById("draw");
const button = document.querySelector("h2");

/* get the rendering context and its drawing functions (получаем контекст визуализации и ее функции рисования) */
const ctx = canvas.getContext("2d");
/* set canvas size to window size */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/*  */
document.body.style.overflow = "hidden";
/* appearance of the "corners" where the lines meet (внешний вид «углов», где встречаются линии) */
ctx.lineJoin = "round";
/* appearance of line ends (внешний вид концов линий) */
ctx.lineCap = "round";
/* line width */
let penWidth = 1;
/* line color */
let hue = 0;
let lineDirection = true;
/* drawing or not drawing */
let isDrawing = false;
/* last position */
let [lastX, lastY] = [0, 0];

const draw = (e) => {
  if (!isDrawing) return;
  ctx.beginPath(); // begin of drawing
  ctx.moveTo(lastX, lastY); // move pen to line start
  ctx.lineTo(e.offsetX, e.offsetY); // end of line
  ctx.stroke(); // end drawing
  [lastX, lastY] = [e.offsetX, e.offsetY];

  /* line width */
  if (penWidth === 100 || penWidth === 0) lineDirection = !lineDirection;
  if (lineDirection) {
    penWidth++;
  } else {
    penWidth--;
  }
  ctx.lineWidth = penWidth;

  /* line color */
  if (hue >= 360) hue = 0;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  hue++;
};

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));


button.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);
