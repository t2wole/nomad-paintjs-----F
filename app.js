const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white";            // 처음 이미지 저장시 배경색
ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
ctx.strokeStyle = INITIAL_COLOR;    // 라인의 색깔
ctx.fillStyle = INITIAL_COLOR;      
ctx.lineWidth = 2.5;                // 라인의 굵기


// 직사각형 만들기
// ctx.fillStyle = 'green';
// ctx.fillRect(50, 20, 100, 49); --> (x, y, width, height)

let painting = false;   // 그리기 전이라 false
let isIn = false;       // 마찬가지
let filling = false;    // 마찬가지

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

// 캔버스 바깥으로 나가면
function leaveMouse(){
    isIn = false;
    ctx.closePath();
}

// 캔버스 안으로 들어오면
function enterMouse(){
    isIn = true;
    ctx.beginPath();
}

// 색 바꾸기
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 굵기 바꾸기
function handleRangeChange(event) {
    const size = event.target.value;    
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    }
    else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    }
}

function handleCM(event) {
    event.preventDefault();
  }

function handleSaveClick() {
    const image = canvas.toDataURL();   //default는 png로 저장
    const link = document.createElement("a");
    link.href = image;               // 링크, 이미지
    link.download = "PintJS[🎨]";   // 제목
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove" , onMouseMove);
    canvas.addEventListener("mousedown" , startPainting);
    canvas.addEventListener("mouseup" , stopPainting);
    canvas.addEventListener("mouseleave", leaveMouse);
    canvas.addEventListener("mouseenter", enterMouse);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}