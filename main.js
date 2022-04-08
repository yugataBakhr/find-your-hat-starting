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
let vertical;
// game flag
let gameFlag = false;

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
    /*
    print() {
        let array1 = this._field[0].join("");
        let array2 = this._field[1].join("");
        let array3 = this._field[2].join("");
        return array1 + "\n" + array2 + "\n" + array3;
    }
    */
   
}

// generate field /////////////////// seems fine
const generateMap = () => {
    let horizontal = Math.floor((Math.random() * 5) + 3);
    vertical = Math.floor((Math.random() * 5) + 3);

    for(j = 0; j < vertical; j++){
        let array = [];

        for(i = 0; i < horizontal; i++){
            array.push(fieldCharacter);
        }
        parentArray.push(array);
    }

    console.log("horizontal = " + horizontal);
    console.log("vertical = " + vertical);
}

generateMap();

let firstField = new Field(parentArray);

/*
let firstField = new Field([
    [fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, hole],
    [hole, fieldCharacter, fieldCharacter]
]);
*/

/// game進行部分

// toggleGameFlag
toggleGameFlag = () => {
    let array = firstField._field.flat(2);
    if(array.includes(hat)){
        gameFlag = true;
    } else {
        gameFlag = false;
    }
}

// game on or off
let gameOn = true;

toggleGameOn = () => {
    gameOn = !gameOn;
}

while(gameOn){
    // initializing field
    firstField.print();
    // random numbers for first pathCharacter and hat
    let startNum1 = 0;
    let startNum2 = 0;
    let hatNum1 = 0;
    let hatNum2 = 0;

    toggleGameFlag();
    console.log(gameFlag);
    
    //initializing game condition
    while(!gameFlag){
        // generate first pathCharacter
        startNum1 = Math.floor(Math.random() * firstField._field[0].length);
        startNum2 = Math.floor(Math.random() * firstField._field.length);

        // generate hat
        hatNum1 = Math.floor(Math.random() * firstField._field[0].length);
        hatNum2 = Math.floor(Math.random() * firstField._field.length);

        if(startNum1 === hatNum1 && startNum2 === hatNum2){
            while(startNum1 === hatNum1 && startNum2 === hatNum2){
                startNum1 = Math.floor(Math.random() * firstField._field[0].length);
                startNum2 = Math.floor(Math.random() * firstField._field.length);
                hatNum1 = Math.floor(Math.random() * firstField._field[0].length);
                hatNum2 = Math.floor(Math.random() * firstField._field.length);
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
        // gameOn which means we don't come back to this function anymore
        gameFlag = true;
    }

    // tell the player where you at
    console.log(`you are at x: ${x}, y: ${y}.`);
    
    // log the field on console
    console.log(firstField.print());

    // ask the player where to go and get the parameter
    let move = prompt("Which direction you want to go? If you want to quit the game, press Ctrl + C.");
    move = String(move);

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
    
    // see if the game goes on or game over
    if(x === hatNum1 && y === hatNum2){
        toggleGameOn();
        console.log("Congrats! You found the hat!");
    } else if(x === -1 || x === firstField._field[0].length + 1 || 
        y === -1 || y === firstField._field.length + 1){
        toggleGameOn();
        console.log("You got lost yourself in dark. Game Over.");
    } else {
        ;
    }
    firstField._field[y][x] = pathCharacter;
    console.log(gameOn);
}
//firstField[0][0] startPoint