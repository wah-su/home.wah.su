// Fields
let prim = document.getElementById("cursor-prim");
let seco = document.getElementById("cursor-sec");
let scroll = 0;
let sx,
  px = (sx = window.innerWidth / 2);
let sy,
  py = (sy = window.innerHeight / 2);
const base_speed = 128;

// Event listeners
// On mouse move
window.addEventListener("mousemove", (e) => {
  // Primary position
  (px = e.clientX), (py = e.clientY);
  prim.style.top = `${py}px`;
  prim.style.left = `${px}px`;
});
window.addEventListener("scroll", (e) => {
  scroll = window.scrollY;
});

// Secondary render loop
let render = () => {
  // Calculates delta value
  if (!this.last) this.last = new Date().getTime();
  let delta = (new Date().getTime() - this.last) / 16;
  this.last = new Date().getTime();

  // Base speed, position difference,
  // direction and distance
  let dx = px - sx,
    dy = py - sy;
  let dir = Math.atan2(dy, dx);
  let dis = Math.sqrt(dx * dx + dy * dy);

  // Ease-out transition
  let t = Math.min(dis / 500, 1);
  let speed = base_speed * (t * t * (3.0 - 2.0 * t) * 0.94 + 0.06) * delta;

  // Calculates new positions and dead zone
  sx += Math.cos(dir) * speed;
  sy += Math.sin(dir) * speed;
  if (dis <= 4) {
    sx = px;
    sy = py;
  }

  // Sets position
  seco.style.top = `${sy - 128 + scroll}px`;
  seco.style.left = `${sx - 128}px`;

  // Loops around
  requestAnimationFrame(render);
};
render();
