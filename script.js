let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
let color = (e) => document.getElementById('colorPicker').value;
const slider = document.querySelector('#pixel-amount');
const sliderText = document.querySelector('.slider-text');
let update = () => sliderText.innerHTML = slider.value;
slider.value = 8;
slider.addEventListener('input', update, createGrid(slider.value));
function createGrid(size) {
    let pad = document.querySelector('.grid-container');
    let pixel = pad.querySelectorAll('div');
    pixel.forEach(div => div.remove());
    pad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    pad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let totalPixels = size * size;

    for (i = 1; i <= (totalPixels); i++) {
        let pixel = document.createElement('div');
        pixel.addEventListener('mouseover',brushColor);
        pixel.addEventListener('mousedown',brushColor);
        pad.insertAdjacentElement("beforeend",pixel);
    }
    clearBoard();
}

const buttons = document.querySelectorAll('button');
let selection = 'brush';
    buttons.forEach(button => {
        button.addEventListener('click', () => selection = button.id)
    });
function brushColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (selection === 'brush') {
        e.target.style.backgroundColor = color();
    } else if (selection === 'eraser') {
        e.target.style.backgroundColor = 'rgb(251, 242, 226)';
    }
};

function clearBoard() {
    const btn = document.getElementById('clear-btn');
    let pad = document.querySelector('.grid-container');
    let pixel = pad.querySelectorAll('div');

    btn.addEventListener('click', (e) => pixel.forEach(div => div.style.backgroundColor = 'rgb(251, 242, 226)'));
};

function fillBoard() {
    const btn = document.getElementById('fill');
    let pad = document.querySelector('.grid-container');
    let pixel = pad.querySelectorAll('div');

    btn.addEventListener('click', (e) => pixel.forEach(div => div.style.backgroundColor = color()));
}