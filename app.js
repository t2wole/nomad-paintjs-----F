const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let isIn = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.moveTo(x,y);
        ctx.beginPath();
    } 
    else if(painting && isIn) {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function leaveMouse(){
    isIn = false;
    ctx.closePath();
}

function enterMouse(){
    isIn = true;
    ctx.beginPath();
}

// 기존의 strokeStyle은 검정이었지만 color를 선택해주면 선택된 컬러로 바귐
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

if(canvas){
    canvas.addEventListener("mousemove" , onMouseMove);
    canvas.addEventListener("mousedown" , startPainting);
    canvas.addEventListener("mouseup" , stopPainting);
    canvas.addEventListener("mouseleave", leaveMouse);
    canvas.addEventListener("mouseenter", enterMouse);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));