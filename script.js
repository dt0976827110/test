const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const prizes = ["買一送一", "10元", "20元", "折扣券", "再抽一次", "50元"];
const colors = ["#FFA726", "#FFCC80"];
const spinButton = document.getElementById("spin");
let angle = 0;
let spinning = false;

function drawWheel() {
  const radius = canvas.width / 2;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const arc = (2 * Math.PI) / prizes.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 畫扇形區塊
  for (let i = 0; i < prizes.length; i++) {
    const startAngle = angle + i * arc;
    const endAngle = startAngle + arc;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius - 10, startAngle, endAngle);
    ctx.fillStyle = colors[i % 2];
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // 畫文字
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + arc / 2);
    ctx.textAlign = "right";
    ctx.font = "bold 16px Arial";
    ctx.fillText(prizes[i], radius - 20, 5);
    ctx.restore();
  }

  // 畫外框
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#FFA500";
  ctx.stroke();
  ctx.closePath();
}

function spinWheel() {
  if (spinning) return;
  spinning = true;

  const duration = 4000; // 總轉動時間
  const spins = 6; // 轉幾圈
  const randomStop = Math.floor(Math.random() * prizes.length);
  const finalAngle = (2 * Math.PI * spins) + (2 * Math.PI * (randomStop / prizes.length));
  const start = performance.now();

  function animate(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);

    // ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    angle = finalAngle * eased;

    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      const selectedIndex = (prizes.length - Math.floor((angle % (2 * Math.PI)) / ((2 * Math.PI) / prizes.length))) % prizes.length;
      alert(`🎉 恭喜你中獎：「${prizes[selectedIndex]}」`);
    }
  }

  requestAnimationFrame(animate);
}

spinButton.addEventListener("click", spinWheel);
drawWheel(); // 初始繪製
