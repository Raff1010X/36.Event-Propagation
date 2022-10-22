const reset = document.getElementById('reset');
const start = document.getElementById('start');
const direction = document.getElementById('direction');
const parent = document.getElementById('parent');
const child = document.getElementById('child');
const grandchild = document.getElementById('grandchild');
const log = document.getElementById('log');
let propagationDirection = false;
let propagationStop = false;
let suma = 0;

(function startMe() {
    addEvents();
})();

function removeEvents() {
    parent.removeEventListener('click', blue, propagationDirection);
    child.removeEventListener('click', yellow, propagationDirection);
    grandchild.removeEventListener('click', red, propagationDirection);
}

function addEvents() {
    parent.addEventListener('click', blue, propagationDirection);
    child.addEventListener('click', yellow, propagationDirection);
    grandchild.addEventListener('click', red, propagationDirection);
}

function blue(e) {
    if (propagationStop) e.stopPropagation();
    logIt(1, 'BLUE');
    checkSum();
}
function yellow(e) {
    if (propagationStop) e.stopPropagation();
    logIt(2, 'YELLOW');
    checkSum();
}
function red(e) {
    if (propagationStop) e.stopPropagation();
    logIt(3, 'RED');
    checkSum();
}
function logIt(ads, color) {
    console.log(color + ' clicked');
    suma += ads;
    log.innerHTML = suma;
}

start.addEventListener('click', () => {
    propagationStop = !propagationStop;
    start.innerHTML = propagationStop ? 'Propagation: OFF' : 'Propagation: ON';
    removeEvents();
    addEvents();
});

direction.addEventListener('click', () => {
    if (propagationDirection) {
        removeEvents();
        propagationDirection = false;
        direction.innerHTML = 'Propagation direction: DOWN';
        addEvents();
    } else {
        removeEvents();
        propagationDirection = true;
        direction.innerHTML = 'Propagation direction: UP';
        addEvents();
    }
});

reset.addEventListener('click', resetAll);

function resetAll() {
    removeEvents();
    addEvents();
    suma = 0;
    log.innerHTML = 0;
    console.clear();
    resetColors();
}

function resetColors() {
    parent.className = 'blue';
    child.className = 'yellow';
    grandchild.className = 'red';
}

function checkSum() {
    if (suma > 20 && parent.classList == 'blue') {
        parent.removeEventListener('click', blue, propagationDirection);
        parent.classList.toggle('gray');
    }
    if (suma > 30 && child.classList == 'yellow') {
        child.removeEventListener('click', yellow, propagationDirection);
        child.classList.toggle('gray');
    }
    if (suma > 40 && grandchild.classList == 'red') {
        grandchild.removeEventListener('click', red, propagationDirection);
        grandchild.classList.toggle('gray');
    }
}
