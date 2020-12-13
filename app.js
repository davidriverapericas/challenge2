/*jshint esversion: 6 */
const gol = require('./src/gameoflife.js');
const { promisify } = require('util');

//Promisfying the sleep function
const sleep = promisify(setTimeout);

//Width and Height Constants to create the game board
const width = 40;
const height = 20;

//Creating the initial array, to be filled later with Life elements
let initialBoard = new Array(height).fill(0).map(() => new Array(width).fill(0));

//Filling the board with Life (50% alive, 50% dead)
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        let cell = new gol.life(x, y, Math.round(Math.random()));
        initialBoard[y][x] = cell;
    }
}

//Creating the main object
const gameOfLife = new gol.gameoflife(initialBoard);

/** 
 * MAIN LOOP of the GAME OF LIFE
 */
let ticks = 100;
const mainLoop = async() => {
    while (ticks > 0) {
        console.clear();
        gameOfLife.nextGen(true);
        ticks--;
        await sleep(150);
    }
};

mainLoop();