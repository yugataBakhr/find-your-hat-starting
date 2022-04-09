const prompt = require('prompt-sync')({sigint: true});
///////////////////////////////////// (push Ctrl + C to exit)

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// where the player is currently at
let x = 0;
let y = 0;

// array to push field data
const parentArray = [];
// number of vertical line for late use
let horizontal = 0;
let vertical = 0;
class Field {
    constructor(field) {
        this._field = field;
    }

    // print current state of field
    print() {
        for(let i = 0; i < vertical; i++) {
            console.log(this._field[i].join(""));
        }
    }
}

// generate field /////////////////// seems fine
const generateMap = () => {
    horizontal = Math.floor((Math.random() * 4) + 3);
    vertical = Math.floor((Math.random() * 4) + 3);

    for(j = 0; j < vertical; j++){
        let array = [];

        for(i = 0; i < horizontal; i++){
            array.push(fieldCharacter);
        }
        parentArray.push(array);
    }
}

generateMap();

const firstField = new Field(parentArray);

// generate first pathCharacter and hat
generatePathAndHat = () => {
    // generate first pathCharacter
    startNum1 = Math.floor(Math.random() * horizontal);
    startNum2 = Math.floor(Math.random() * vertical);

    // generate hat
    hatNum1 = Math.floor(Math.random() * horizontal);
    hatNum2 = Math.floor(Math.random() * vertical);

    // do it again if those are at the exact same spot
    if(startNum1 === hatNum1 && startNum2 === hatNum2){
        while(startNum1 === hatNum1 && startNum2 === hatNum2){
            startNum1 = Math.floor(Math.random() * horizontal);
            startNum2 = Math.floor(Math.random() * vertical);
            hatNum1 = Math.floor(Math.random() * horizontal);
            hatNum2 = Math.floor(Math.random() * vertical);
        }
    } else {
        ;
    }

    // set start point & goal point
    firstField._field[startNum2][startNum1] = pathCharacter;
    firstField._field[hatNum2][hatNum1] = hat;
    console.log(`goal is at hatNum1: ${hatNum1}, hatNum2: ${hatNum2}.`);

    // update where the player is at
    x = startNum1;
    y = startNum2;
}

generatePathAndHat();

/// game進行部分
let gameFlag = false;

toggleGameFlag = () => {
    gameFlag = !gameFlag;
}

while(!gameFlag){
    // initializing field
    firstField.print();
    // tell the player where you at
    console.log(`You are at x: ${x}, y: ${y}.`);
    console.log("x.length = " + horizontal);
    console.log("y.length = " + vertical);
    console.log(`The hat is at x: ${hatNum1}, y: ${hatNum2}.`);

    // ask the player where to go and get the parameter
    let move = prompt("Which direction you want to go? If you want to quit the game, press Ctrl + C.");
    move = String(move);

    // make player move
    switch(move) {
        case("w"):
            y--;
            break;
        case("s"):
            y++;
            break;
        case("a"):
            x--;
            break;
        case("d"):
            x++;
            break;
        default:
            console.log("Error! You have to press either 'w', 's', 'a', 'd'.");
    }

    firstField._field[y][x] = pathCharacter;
    
    // see if the game goes on or game over
    if(firstField._field[y][x] == firstField._field[hatNum2][hatNum1]) {
        console.log("Congrats! You found the hat!");
        toggleGameFlag();
    } else if(0 > x || x >= horizontal || 0 > y || y >= vertical) {
        console.log("You got lost yourself in dark. Game Over.");
        toggleGameFlag();
    } else {
        ;
    }
    console.log("GameFlag is now... " + gameFlag);
}