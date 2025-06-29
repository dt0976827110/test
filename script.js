
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const prizes = ["$100禮券", "謝謝參與", "免費飲料", "再轉一次", "精美小禮", "$50折扣", "神秘大獎", "沒中"];
const colors = ["#f8b195", "#f67280", "#c06c84", "#6c5b7b", "#355c7d", "#99b898", "#feceab", "#ff847c"];
const spinBtn = document.getElementById("spin");
const resultText = document.getElementById("result");
let startAngle = 0;
let arc = Math.PI / (prizes.length / 2);
let spinTimeout = null;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    for (let i = 0; i < prizes.length; i++) {
        let angle = startAngle + i * arc;
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, angle, angle + arc, false);
        ctx.lineTo(250, 250);
        ctx.fill();

        ctx.save();
        ctx.fillStyle = "white";
        ctx.translate(250, 250);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.font = "16px Microsoft JhengHei";
        ctx.fillText(prizes[i], 230, 10);
        ctx.restore();
    }
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    let degrees = startAngle * 180 / Math.PI + 90;
    let arcd = arc * 180 / Math.PI;
    let index = Math.floor((360 - (degrees % 360)) / arcd);
    resultText.innerText = "🎉 恭喜你中獎：「" + prizes[index] + "」";
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

spinBtn.addEventListener("click", () => {
    spinAngleStart = Math.random() * 3000 + 2000;
    spinTime = 0;
    spinTimeTotal = 3000;
    rotateWheel();
});

drawWheel();
