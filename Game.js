import React, { Component } from 'react';
import Cells from '/Cells';
import './style.css';
import { START, BODY, FOOD, KEYS, COLS, DIRS } from './const';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board: [],
            snake: [],
            direction: null,
            gameOver: false
        };

        this.start = this.start.bind(this);
        this.frame = this.frame.bind(this);
        this.handleKey = this.handleKey.bind(this);
    }
    componentDidMount() {
        this.start();
    }

    start() {
        const board = [];

        board[START] = BODY;

        const snake = [START];

        this.setState({
            board,
            snake,
            direction: KEYS.down
        }, () => {
            this.frame();
        });
    }
    frame() {
        let { snake, board, direction } = this.state;
        const head = this.getNextIndex(snake[0], direction);

        const food = board[head] === FOOD ||
            snake.lenght === 1;

        if (snake.indexOf(head) !== -1) {
            this.setState({ gameOver: true });
            return;

        }

        if (food) {
            const maxCells = ROWS * COLS;

            let i;


            do {
                i = Math.floor(Math.random() * maxCells)
            }
            while (board[i])
            board[i] = FOOD;
        } else {
            board[snake.pop()] = null;
        }

        board[head] = BODY;
        snake.unshift(head);

        if (this.nextDirection) {
            direction = this.nextDirection;
            this.nextDirection = null;
        }


        this.setState({
            board,
            snake
        }, () => {
            setTimeout(this.frame, 200)
        })

    }

    handleKey = (event) => {
        const direction =
            event.nativeEvent.keyCode;

        const diff = Math.abs(this.state.direction - direction);

        if (DIRS[direction] && diff !== 0 && diff !== 2) {
            this.nextDirection = direction;
        }
    }

    getNextIndex(head, direction) {
        let x = head % COLS;
        let y = Math.floor(head / COLS);


        switch (direction) {
            case KEYS.up: y = y <= 0 ? ROWS - 1 : y - 1; break;
            case KEYS.down: y = y >= ROWS ? 0 : y + 1; break;
            case KEYS.left: x = x <= 0 ? COLS - 1 : x - 1; break;
            case KEYS.right: x = x >= COLS - 1 ? 0 : x + 1; break;
            default: return;
        }

        return (COLS * y) + x;
    }


    render() {
        const { board } = this.state;

        return (
            <Cells
                handleKey={this.handleKey}
                board={board}
            />
        )

    }
}

export default Game;