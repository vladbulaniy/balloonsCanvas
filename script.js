var canvas = document.getElementById("canvas"),
    drawArea = canvas.getContext("2d"),
    canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    ballCount = 10,
    ballons = [];

var Balloon = function(objCoords){
    this.x = objCoords.x;
    this.y = objCoords.y;
    this.speed = 5;
    this.directionAngle = Math.round(Math.random());
    this.color = "rgb("+ Math.floor(Math.random() * (226))+","+ Math.floor(Math.random() * (226)) +","+ Math.floor(Math.random() * (226))+")";
    this.radius = 20;
    this.direction = {
        x: Math.cos( Math.round( Math.random() * 10 ) ) * this.speed,
        y: Math.sin( Math.round( Math.random() * 10 ) ) * this.speed
    };

    this.update = function(){
        this.border();
        this.x += this.direction.x;
        this.y += this.direction.y;
    };
    this.border = function(){
        if (this.x >= canvasWidth - this.radius || this.x <= this.radius) {
            this.direction.x *= -1;
            // this.radius = this.radius-5;
            // setTimeout(function(){
            //     this.radius = this.radius+5;
            // },1000);
            // this.radius = this.radius+5;

        }
        if (this.y >= canvasHeight - this.radius || this.y <= this.radius) {
            this.direction.y *= -1;
            // this.radius = this.radius-5;
            // this.radius = this.radius+5;

        }
        if (this.x > canvasWidth - this.radius) this.x = canvasWidth - this.radius;
        if (this.y > canvasHeight - this.radius) this.y = canvasHeight - this.radius;
        if (this.x < this.radius) this.x = this.radius;
        if (this.y < this.radius) this.y = this.radius;
    };
    this.draw = function(){
        drawArea.beginPath();
        drawArea.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        var ballGradien = drawArea.createRadialGradient(this.x-10, this.y-5, 3, this.x, this.y, this.radius);
        ballGradien.addColorStop(0.5,this.color);
        ballGradien.addColorStop(0,lighterColor(this.color));
        ballGradien.addColorStop(1,darkerColor(this.color));
        drawArea.fillStyle = ballGradien;
        drawArea.shadowColor = "#000000";
        drawArea.shadowBlur = 3;
        drawArea.fill();
    };
};

function ChangeRadius(radius) {
    return radius = radius+5;
}

function loop(){
    window.requestAnimationFrame(loop);
    drawArea.clearRect(0,0,canvasWidth,canvasHeight);
    for (var i = 0; i < ballons.length; i++){
        ballons[i].update();
        ballons[i].draw();
    }
}

function getBallon(e) {
    if (ballCount > 0){
        ballons.push( new Balloon( getCursorPosition(e) ) );
    }
    if (ballCount === 10) window.requestAnimationFrame(loop);
    ballCount--;
}

function getCursorPosition(e) {
    var obj ={};
    if (e.pageX != undefined && e.pageY != undefined) {
        obj.x = e.pageX;
        obj.y = e.pageY;
    }
    else {
        obj.x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        obj.y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    obj.x -= canvas.offsetLeft;
    obj.y -= canvas.offsetTop;
    return obj;
}

function lighterColor(str){
    var arr = str.match(/\d+/g);
    return "rgb("+ (+arr[0]+30)+","+ (+arr[1]+30) +","+ (+arr[2]+30) +")";
}
function darkerColor(str){
    var arr = str.match(/\d+/g);
    return "rgb("+ (arr[0]-30)+","+ (arr[1]-30) +","+ (arr[2]-30) +")";
}

canvas.addEventListener("click", getBallon);