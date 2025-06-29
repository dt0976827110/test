
function drawLottery() {
    const prizes = ['一杯咖啡 ☕', '免運券 🚚', '再接再厲 😅'];
    const result = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById('result').innerText = '你抽到：' + result;

    // 可選：發送訊息到 LINE 對話視窗（需搭配 LIFF 使用）
    // liff.sendMessages([{ type: 'text', text: '我抽到了：' + result }])
    //     .then(() => console.log('訊息已發送'))
    //     .catch((err) => console.error('發送失敗', err));
}
