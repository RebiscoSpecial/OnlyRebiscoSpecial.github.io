// DOM variables

const scoreDiv = document.querySelector('.score');
const msgDiv = document.querySelector('.msg');
const gameContainer = document.querySelector('.game');
const playerDiv = document.querySelector('.player');
const buildingsDiv = document.querySelector('.buildings');
const road = document.querySelector('.road');

// Game const / variables

const g = 0.098;
const buildings = [];
const player = {
    x: 320,
    y: 0,
    v: 0
}

let gameStatus = 'start';
let speed, score, nextBuildingX, gameProgress, lastHeight, lastTime;

// On click event

gameContainer.addEventListener('mousedown', () => {
    switch (gameStatus) {

        case "start":
        case "end":
            startGame();
            break;

        case "on":
            jump();
            break;
    }
});

// document.addEventListener('keydown', (e) => {
//     if((e.keyCode == 32) || (e.keyCode == 38)) {
//     }
// });

// --------------------------------------------------------------------------

// Game functions

function startGame() {

    // Reset all game variables

    buildings.splice(0,buildings.length);
    buildingsDiv.innerHTML = '';

    player.x = 480;
    player.y = 0;
    player.v = 0;

    speed = 1;
    score = 0;
    nextBuildingX = 960;
    gameProgress = 0;
    lastHeight = 0;
    
    lastTime = 0;
    gameStatus = 'on';
    render();

    msgDiv.innerHTML = `<h2>Escape the Laser!</h2>(Click to jump)`;
    setTimeout(() => {
        msgDiv.classList = 'msg off';
    }, 3000);
}

function jump() {
    if (player.v !== 0) { return false; }
    player.v = 3.2;
}

function render() {

    // set the Delat time
    
    const thisTime = performance.now();
    const dt = Math.min(32, Math.max(8, thisTime - lastTime)) / 16.666;
    lastTime = thisTime;

    // semi render for the end fall

    if ((gameStatus === 'dead'))  {

        if (player.y > 0) {
            player.y = Math.max(0, player.y + player.v * dt);
            player.v -= g * dt;
            playerDiv.style.setProperty('--player-y', (320 - player.y) + "px");
            requestAnimationFrame(render);
        } else {
            gameStatus = 'end';
            msgDiv.innerHTML += `Click to restart`;
        }
        return false;
    }

    // Render buildings

    if (nextBuildingX < gameProgress + 960 + speed * dt) {
        createBuilding();
    }

    let base = 0; // current building height
    const destroyBuildings = []; // building that cross the 'destroy line'
    let nextBuilding = buildings[0];

    buildings.forEach((building, ix) => {

        if (building.x < player.x) {
            base = building.height;
            nextBuilding = buildings[ix + 1]
        }

        if (building.x < gameProgress + 180) {
            destroyBuildings.push(ix);
        }

        building.div.style.setProperty('--building-x', (building.x - gameProgress) + "px");
    });

    // Render player

    if (player.v > 0) { // is jumping
        player.y += player.v * dt;
        player.v = Math.max(0, player.v - g * dt);
        playerDiv.classList = 'player jump';
        
    } else if (base < player.y) { // is falling
        player.y = Math.max(base, player.y + player.v * dt);
        player.v -= g * dt;
        playerDiv.classList = 'player jump';

    } else { // is running
        player.v = 0;
    }
    
    playerDiv.classList = `player ${player.v === 0 ? 'run' : 'jump'}`;
    
    let nextPlayerX = player.x + speed * dt;
    
    if (nextPlayerX - gameProgress < 720) {
        nextPlayerX += 1 / speed * dt;
    }

    if ((nextPlayerX > nextBuilding.x) && (nextBuilding.height > player.y)) {
        nextPlayerX = nextBuilding.x;
        playerDiv.classList = 'player idle';
    }

    player.x = nextPlayerX;

    playerDiv.style.setProperty('--player-x', (nextPlayerX - gameProgress) + "px");
    playerDiv.style.setProperty('--player-y', (320 - player.y) + "px");

    road.style.left = (gameProgress % 10) * -1 + 'px';

    destroyBuildings.forEach(ix => {

        const thisDiv = buildings[ix].div
        thisDiv.classList.add('destroy');

        setTimeout(() => {
            thisDiv.parentNode.removeChild(thisDiv);
        }, 1000);

        if ((player.x <= buildings[ix].x + buildings[ix].width) && (player.y <= buildings[ix].height)) {
            gameStatus = 'dead';
            playerDiv.classList = 'player dead';

            msgDiv.innerHTML = `<h2>You're dead!</h2>`;
            msgDiv.classList = 'msg';
        
        } else {
            buildings.splice(ix, 1);
            score++;
        }
    });

    speed += 0.001 * dt;
    gameProgress += speed * dt;

    scoreDiv.innerHTML = `Score: ${score}`;

    if ((gameStatus === 'on') || (gameStatus === 'dead')) {
        requestAnimationFrame(render)
    }
}

function createBuilding() {

    const building = {};
    building.x = nextBuildingX;
    building.width = 60 + Math.round(Math.random() * 60);
    building.height = Math.min(Math.max((30 + Math.round(Math.random() * 120)), lastHeight - 30), lastHeight + 30);
    
    const buildingDiv = document.createElement('div');
    buildingDiv.classList = "building"
    buildingDiv.style.width = building.width + 'px';
    buildingDiv.style.height = building.height + 'px';
    
    buildingDiv.style.setProperty('--hue', Math.round(Math.random() * 360) + 'deg');
    buildingDiv.style.setProperty('--buildingImageX', Math.floor(Math.random() * 4) * 27.08333 + '%');

    for (let i = 0; i < 12; i++) {

        const fragmentDiv = document.createElement('div');

        fragmentDiv.classList = "building_fragment"
        fragmentDiv.style.setProperty('--tx', Math.random() * -120 + 'px');
        fragmentDiv.style.setProperty('--ty', Math.random() * -160 + 'px');
        fragmentDiv.style.setProperty('--rx', Math.random() * 360 + 'deg');
        fragmentDiv.style.setProperty('--ry', Math.random() * 360 + 'deg');
        fragmentDiv.style.setProperty('--rz', Math.random() * 360 + 'deg');

        buildingDiv.appendChild(fragmentDiv);
    }

    building.div = buildingDiv;
    
    buildingsDiv.appendChild(buildingDiv);
    buildings.push(building);

    nextBuildingX += building.width;
    lastHeight = building.height;
}