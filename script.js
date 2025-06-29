const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");

const segments = ["50元", "買一送一", "10元", "20元", "折扣券", "再抽一次"];
const colors = ["#f90", "#fb8", "#f90", "#fb8", "#f90", "#fb8"];

let angle = 0;
let spinning = false;

function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;
  const arc = (2 * Math.PI) / segments.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  for (let i = 0; i < segments.length; i++) {
    // 扇形區塊
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.fillStyle = colors[i];
    ctx.arc(0, 0, radius - 10, i * arc, (i + 1) * arc);
    ctx.fill();

    // 文字
    ctx.save();
    ctx.fillStyle = "white";
    ctx.rotate(i * arc + arc / 2);
    ctx.translate(radius * 0.65, 0);
    ctx.rotate(Math.PI / 2);
    ctx.font = "bold 18px Arial";
    ctx.fillText(segments[i], -ctx.measureText(segments[i]).width / 2, 0);
    ctx.restore();
  }

  ctx.restore();
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3); // 緩慢停下的 easing 曲線
}

function spinWheel() {
  if (spinning) return;
  spinning = true;

  const duration = 4000; // 總時長（ms）
  const start = performance.now();
  const spins = 6 + Math.random() * 2; // 至少轉 6 圈，最多 8 圈

  function animate(time) {
    const elapsed = time - start;
    const t = Math.min(1, elapsed / duration);
    const eased = easeOut(t);
    angle = eased * spins * 2 * Math.PI;
    drawWheel();

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      angle = angle % (2 * Math.PI);
      showResult();
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}

function showResult() {
  const arc = (2 * Math.PI) / segments.length;
  const fixedAngle = (angle + Math.PI / 2) % (2 * Math.PI); // 上方為 0 度
  const index = Math.floor((segments.length - fixedAngle / arc) % segments.length);
  const prize = segments[index];
  alert(`🎉 恭喜你抽中：${prize}！`);
}

drawWheel();
spinBtn.addEventListener("click", spinWheel);
