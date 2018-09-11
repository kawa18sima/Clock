let canvas = document.getElementById("canvas");
let changeButton = document.getElementById("change");
let ctx = canvas.getContext("2d");
var flag = false;
var color = "#000";
ctx.font = "30px serif";
chrome.storage.sync.get('time', function(data) {
  flag = data.time;
  drawingClock();
  canvasSize();
});
chrome.storage.sync.get('clockColor', function(data) {
  color = data.clockColor;
});
repeat();

function repeat(){
  setInterval(function(){
    drawingClock(flag);
  }, 100);
}

function timeText(){
  var d = new Date();
  var second = ("0" + d.getSeconds()).slice(-2);
  var minute = ("0" + d.getMinutes()).slice(-2);
  var hour   = ("0" + d.getHours()).slice(-2);
  return hour + ":" + minute + ":" + second;
}

function drawingClock(){
  ctx.clearRect(0, 0, 150, 100);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  if(flag) ctx.fillText(timeText(), 0, 30);
  else{
    var x = 52;
    var y = 52;
    var outsideRadius = 50;
    var insideRadius = 35;

    //outside circle
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(x, y, outsideRadius, 0, Math.PI*2, false);
    ctx.stroke();

    //inside circle
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(x, y, insideRadius, 0, Math.PI*2, false);
    ctx.stroke();

    //number
    ctx.beginPath();
    ctx.font = "13px 'Impact'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"
    for(var i=1; i<13; i++){
      var radian = i * Math.PI / 6;
      var xx = x + (insideRadius + 7.5) * Math.sin(radian);
      var yy = y - (insideRadius + 7.5) * Math.cos(radian);
      var text = "" + i;
      ctx.fillText(text, xx, yy);
    }

    //time
    ctx.beginPath();
    ctx.globalAlpha = 0.2;
    for(var i=1; i<61; i++){
      var radian = i * Math.PI / 30;
      var xx = x + insideRadius * Math.sin(radian);
      var yy = y - insideRadius * Math.cos(radian);
      ctx.moveTo(xx, yy);
      var length = (i%5 == 0) ? 8 : 5;
      xx = x + (insideRadius - length) * Math.sin(radian);
      yy = y - (insideRadius - length) * Math.cos(radian);
      ctx.lineTo(xx, yy);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    var d = new Date();

    //Second Hand
    ctx.beginPath();
    ctx.moveTo(x, y);
    var radian = d.getSeconds() * Math.PI / 30;
    ctx.lineWidth = 0.5;
    var xx = x + (insideRadius - 7) * Math.sin(radian);
    var yy = y - (insideRadius - 7) * Math.cos(radian);
    ctx.lineTo(xx, yy);
    ctx.stroke();

    //minute hand
    ctx.beginPath();
    ctx.moveTo(x, y);
    radian = d.getMinutes() * Math.PI / 30;
    ctx.lineWidth = 1.5;
    xx = x + (insideRadius - 8) * Math.sin(radian);
    yy = y - (insideRadius - 8) * Math.cos(radian);
    ctx.lineTo(xx, yy);
    ctx.stroke();

    //hour hand
    ctx.beginPath();
    ctx.moveTo(x, y);
    radian = d.getHours() * Math.PI / 6;
    ctx.lineWidth = 3;
    xx = x + (insideRadius - 15) * Math.sin(radian);
    yy = y - (insideRadius - 15) * Math.cos(radian);
    ctx.lineTo(xx, yy);
    ctx.stroke();
    ctx.restore();
  }
}

changeButton.onclick = function(){
  flag = !flag;
  chrome.storage.sync.set({time: flag}, function() {});
  ctx.clearRect(0, 0, 150, 100);
  canvasSize(flag);
}

function canvasSize(){
  if(flag){
    canvas.width = 150;
    canvas.height = 30;
    ctx.font = "30px serif";
  }
  else{
    canvas.width = 105;
    canvas.height = 105;
  }
}
