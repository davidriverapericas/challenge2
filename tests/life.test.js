/*jshint esversion: 6 */

const gol = require('../src/gameoflife');

test('Life Constructor: x coordinate', () => {
    let el = new gol.life(10, 11, true);
    expect(el.x).toBe(10);
});

test('Life Constructor: y coordinate', () => {
    let el = new gol.life(10, 11, true);
    expect(el.y).toBe(11);
});

test('Life Constructor: status alive', () => {
    let el = new gol.life(10, 11, true);
    expect(el.isalive).toBe(true);
});

test('Life Constructor: status dead', () => {
    let el = new gol.life(10, 11, false);
    expect(el.isalive).toBe(false);
});

test('Life Constructor: without status => false', () => {
    let el = new gol.life(10, 11);
    expect(el.isalive).toBe(false);
});

test('Life checkStatus: without board => no change should be applied', () => {
    let el = new gol.life(10, 10, true);
    el.checkStatus();
    expect(el.isalive).toBe(true);
    let el2 = new gol.life(10, 10, false);
    el2.checkStatus();
    expect(el2.isalive).toBe(false);
});

test('Life checkStatus: Board 3x3. All dead', () => {
    const width = 3;
    const height = 3;
    let initialBoard = new Array(height).fill(0).map(() => new Array(width).fill(0));
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cell = new gol.life(x, y, false);
            initialBoard[y][x] = cell;
        }
    }

    const gameOfLife = new gol.gameoflife(initialBoard);
    gameOfLife.nextGen();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            expect(gameOfLife.board[y][x].isalive).toBe(false);
        }
    }
});

test('Life checkStatus: Board 3x3. All alive => 1x1 should dead', () => {
    const width = 3;
    const height = 3;
    let initialBoard = new Array(height).fill(0).map(() => new Array(width).fill(0));
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cell = new gol.life(x, y, true);
            initialBoard[y][x] = cell;
        }
    }

    const gameOfLife = new gol.gameoflife(initialBoard);
    //console.log(`::: initial render :::\n${gameOfLife.renderBoard()}`);
    gameOfLife.nextGen(false);

    let x = 1;
    let y = 1;
    //console.log(`Life at ${x}x${y} has ${gameOfLife.board[x][y].neighbours} neightbours => ${gameOfLife.board[x][y].willBeAlive}`);
    expect(gameOfLife.board[y][x].willBeAlive).toBe(false);
});


test('Life checkStatus: Board 3x3. All alive => Only corners should be alive', () => {
    const width = 3;
    const height = 3;
    let initialBoard = new Array(height).fill(0).map(() => new Array(width).fill(0));
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cell = new gol.life(x, y, true);
            initialBoard[y][x] = cell;
        }
    }

    const gameOfLife = new gol.gameoflife(initialBoard);
    gameOfLife.nextGen(false);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if ((x == 0 && y == 0) || (x == 2 && y == 0) || (x == 0 && y == 2) || (x == 2 && y == 2)) {
                expect(gameOfLife.board[y][x].willBeAlive).toBe(true);
            } else {
                expect(gameOfLife.board[y][x].willBeAlive).toBe(false);
            }
        }
    }
});
test('Life checkStatus: Board 3x3. All alive => After 2 ticks all should be dead', () => {
    const width = 3;
    const height = 3;
    let initialBoard = new Array(height).fill(0).map(() => new Array(width).fill(0));
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cell = new gol.life(x, y, true);
            initialBoard[y][x] = cell;
        }
    }

    const gameOfLife = new gol.gameoflife(initialBoard);
    gameOfLife.nextGen(false);
    gameOfLife.nextGen(false);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            expect(gameOfLife.board[y][x].willBeAlive).toBe(false);
        }
    }
});

test('Life checkStatus: Board 3x3. Only 1st row alive => Check if 1x1 will resurrect and 1x0 is the only alive', () => {
    const width = 3;
    const height = 3;
    let initialBoard = new Array(height).fill(0).map(() => new Array(width).fill(0));
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cell = new gol.life(x, y, y == 0 ? true : false);
            initialBoard[y][x] = cell;
        }
    }

    const gameOfLife = new gol.gameoflife(initialBoard);
    gameOfLife.nextGen(false);
    expect(gameOfLife.board[1][1].isalive).toBe(true);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            expect(gameOfLife.board[y][x].isalive).toBe((x == 1 && y < 2) ? true : false);
        }
    }
});

test('Life checkStatus: Board 3x3. A alive block of 2x2 will live forever', () => {
    const width = 3;
    const height = 3;
    let initialBoard = new Array(height).fill(0).map(() => new Array(width).fill(0));
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let cell = new gol.life(x, y, x < 2 && y < 2 ? true : false);
            initialBoard[y][x] = cell;
        }
    }

    const gameOfLife = new gol.gameoflife(initialBoard);

    gameOfLife.nextGen(false);
    gameOfLife.nextGen(false);
    gameOfLife.nextGen(false);
    gameOfLife.nextGen(false);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            expect(gameOfLife.board[y][x].isalive).toBe((x < 2 && y < 2) ? true : false);
        }
    }
});