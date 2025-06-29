const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');

const prizes = ['頭獎', '二獎', '三獎', '銘謝惠顧', '再接再厲', '小獎'];
const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#BA68C8', '#FFA726'];
const slices = prizes.length;
const anglePerSlice = (2 * Math.PI) / slices;
let rotation = 0;
let spinning = false;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < slices; i++) {
    const startAngle = anglePerSlice * i + rotation;
    const endAngle = anglePerSlice * (i + 1) + rotation;

    // 區塊
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, startAngle, endAngle);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.stroke();

    // 文字
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(startAngle + anglePerSlice / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000';
    ctx.font = '20px sans-serif';
    ctx.fillText(prizes[i], 220, 10);
    ctx.restore();
  }

  // 指針
  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(240, 20);
  ctx.lineTo(260, 20);
  ctx.closePath();
  ctx.fillStyle = '#000';
  ctx.fill();
}

function spinWheel() {
  if (spinning) return;
  spinning = true;

  let speed = Math.random() * 0.2 + 0.3;
  const deceleration = 0.003;

  const spin = () => {
    if (speed <= 0) {
      spinning = false;
      const degrees = ((rotation % (2 * Math.PI)) * 180) / Math.PI;
      const selectedIndex = Math.floor(((2 * Math.PI - rotation % (2 * Math.PI)) / anglePerSlice)) % slices;
      setTimeout(() => {
        alert(`🎉 恭喜你抽到：${prizes[selectedIndex]}！`);
      }, 500);
      return;
    }

    rotation += speed;
    speed -= deceleration;
    drawWheel();
    requestAnimationFrame(spin);
  };

  spin();
}

document.getElementById('spin').addEventListener('click', spinWheel);
drawWheel();
