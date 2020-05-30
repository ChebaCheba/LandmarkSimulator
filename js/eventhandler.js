function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(canvas.width, canvas.height);
}

function initEvent() {
    window.addEventListener('resize', resizeCanvas, false);
 }
