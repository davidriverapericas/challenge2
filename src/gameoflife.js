/*jshint esversion: 6 */

/**
 * Life class.
 * 
 * It represents the status (alive or dead) of a cell in the Board.
 */
class Life {
    /**
     * Life constructor.
     * 
     * @param {integer} x Coordinate in the X-axis of the Life in the board.
     * @param {integer} y Coordinate in the Y-axis of the Life in the board.
     * @param {boolean} isalive Status of the Cell: True (Alive) or False (Dead).
     */
    constructor(x = 0, y = 0, isalive = false) {
        this.x = parseInt(x, 10);
        this.y = parseInt(y, 10);
        this.isalive = isalive == true ? true : false;
        this.willBeAlive = isalive == true ? true : false;
        this.neighbours = 0;
    }

    /**
     * Applying the Logic and Rules of the Game of Life on the cell.
     * 
     * Rules: 
     *  L An alive life with 2 or 3 neightbours will keep alive.
     *  L In anothe case, the alive will be dead.
     *  L A dead one will resurrect if it has 3 alive neightbours.
     * 
     * Note: The new status of the cell is not applied.
     * 
     * @param {array} lifeBoard 
     */
    checkStatus(lifeBoard) {
        let neighbours = 0;
        const testx = -1;
        const testy = -1;
        if (lifeBoard) {
            /**
             * Counting the total number of neightbours
             */
            for (let posx = -1; posx < 2; posx++) {
                for (let posy = -1; posy < 2; posy++) {
                    if (posx != 0 || posy != 0) {
                        if (lifeBoard[this.y + posy] !== undefined && lifeBoard[this.y + posy][this.x + posx] !== undefined) {
                            if (lifeBoard[this.y + posy][this.x + posx].isalive) {
                                neighbours++;
                            }
                        }
                    }
                }
            }
            /**
             * Applying the Game Rules:
             *  L An alive life with 2 or 3 neightbours will keep alive
             *  L In anothe case, the alive will be dead
             *  L A dead one will resurrect if it has 3 alive neightbours 
             **/
            let newalive = false;
            if (this.isalive) {
                if (neighbours === 2 || neighbours === 3) {
                    newalive = true;
                }
            } else if (neighbours === 3) {
                newalive = true;
            }
            this.willBeAlive = newalive;
            this.neighbours = neighbours;
        }
    }

    /**
     * To store the new status (calculated with funciont checkStatus) of the Cell
     */
    storeStatus() {
        this.isalive = this.willBeAlive;
    }
}

/**
 * GameOfLife Class.
 * 
 * It represents the status (alive or dead) of a cell in the Board
 */
class GameOfLife {
    constructor(board) {
        this.width = board.length;
        this.height = board[0].length;
        this.tick = 0;
        this.board = board;
    }

    /**
     * Calculating the next generation for all cells in the board.
     * 
     * @param {boolean} render True to render the board in the console 
     */
    nextGen(render = false) {
        this.tick++;

        //Checking the future of each life
        this.board.forEach(row => {
            row.forEach(col => {
                col.checkStatus(this.board);
            });
        });

        //Setting now = calculated future of each life
        this.board.forEach(row => {
            row.forEach(col => {
                col.storeStatus();
            });
        });
        //If render is required
        if (render) {
            console.log(this.renderBoard());
        }
    }

    /**
     * Render the status of each Life cell, the complete board in the console.
     * 
     * Left side: Livinng cells
     * Right side: Number of neighbours per cell
     */
    renderBoard() {
        let str = `--------------------------------------------------------------\nCurrent tick: ${this.tick}\n`;
        let y = 0;
        let totalAlive = 0;
        let willDead = 0;
        let willBeAlive = 0;
        let willResurect = 0;
        this.board.forEach(row => {
            str += this.padLeadingZeros(y, 3) + ' | ';
            let nei = '  ';
            row.forEach(col => {
                totalAlive += col.isalive ? 1 : 0;
                willBeAlive += col.willBeAlive ? 1 : 0;
                willDead += (col.isalive && !col.willBeAlive) ? 1 : 0;
                willResurect += (!col.isalive && col.willBeAlive) ? 1 : 0;

                str += col.isalive ? '\u2588' : ' ';
                nei += col.neighbours;
            });
            str += nei;
            str += '\n';
            y++;
        });

        str += '----------------------------------------------\n';
        str += `Area: ${this.width}x${this.height}\nAlive: ${totalAlive}\nWill survive: ${willBeAlive}, Will dead: ${willDead}, Will resurrect: ${willResurect}`;

        return (str);
    }

    /**
     * Format number with leading 0s 
     * 
     * @param {integer} num Number to be printed
     * @param {integer} size Size of string (number with leading 0's)
     */
    padLeadingZeros(num, size) {
        let s = num + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }
}

module.exports = {
    life: Life,
    gameoflife: GameOfLife
};