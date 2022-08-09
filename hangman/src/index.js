import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import step0 from "./images/0.jpeg";
import step1 from "./images/1.jpeg";
import step2 from "./images/2.jpeg";
import step3 from "./images/3.jpeg";
import step4 from "./images/4.jpeg";
import step5 from "./images/5.jpeg";
import step6 from "./images/6.jpeg";
import {randomFood} from "./words/food";
import {randomLanguage} from "./words/language";

import reportWebVitals from './reportWebVitals';

let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

alphabet = alphabet.map(letter => {return letter.toLowerCase();});

function Letter(props) {
    let guessed = props.isGuessed(props.value);
    if (guessed) {
        return (
            <button
                onClick={props.onClick}
                className="guessed"
            >
                {props.value}
            </button>
        );}
    else {
        return (
            <button
                onClick={props.onClick}
                className="letter"
            >
                {props.value}
            </button>
        );
    }
}

class Game extends React.Component {
    static imageSet = [step0, step1, step2, step3, step4, step5, step6];
    constructor(props) {
        let type;
        let word;
        if (Math.random() <= 0.5) {
            type = "food";
            word = randomFood();
        } else {
            type = "programming language";
            word = randomLanguage();
        }
        super(props);
        this.state = {
            type: type,
            chancesLeft: 6,
            answer: word,
            guessedLetters: new Set(),
            correctLetters: new Set(),
            status: "There are 6 chances left!",
            guessBar: "_ ".repeat(word.length),
            gallow_idx: 0,
        }
        this.reset = this.reset.bind(this);
    }

    isGuessed(value) {
        return this.state.guessedLetters.has(value);
    }

    checkWinning(guessedLetters, chancesLeft) {
        const setsAreEqual = (a, b) => {
            if (a.size !== b.size) {
                return false;
            }

            return Array.from(a).every(element => {
                return b.has(element);
            });
        }

        let answer = new Set(this.state.answer);
        console.log(answer);
        let allGuessed = setsAreEqual(answer, guessedLetters);
        if (chancesLeft >= 0 && allGuessed) {
            return true;
        } else if (chancesLeft <= 0 && !allGuessed) {
            return false;
        } else {
            return null;
        }
    }

    renderGallow() {
        return (
            <div className="gallow">
                <img alt={'gallow'} src={Game.imageSet[this.state.gallow_idx]}/>
            </div>
        );
    }

    renderKeyboard() {
        return (
            <div className={"keyboard"}>
                {alphabet.map((letter, i) => (
                    <Letter
                        value={letter}
                        onClick={() => this.handleLetterClick(letter)}
                        isGuessed = {(value) => {return this.state.guessedLetters.has(value);}
                        }
                    />
                ))}
                <button className={'resetBtn'} onClick={this.reset} >Reset</button>
            </div>
        );
    }

    renderStatus() {
        return (
            <div className="status">
                {this.state.status}
            </div>
        );
    }

    renderGuessBar() {
        return (
            <div className="guess">
                {this.state.guessBar}
            </div>
        );
    }

    updateGuessBar(value) {
        const indexOfAll = (sourceStr, searchStr) => {
            const indices = [];
            for(let i=0; i<sourceStr.length; i++) {
                if (sourceStr[i] === searchStr) indices.push(i);
            }
            return indices;
        };
        const sourceStr = this.state.answer;
        const indices = indexOfAll(sourceStr, value);
        console.log(indices);
        const guess_bar = this.state.guessBar.trim().split(" ");
        console.log(indices.length);
        for (let i = 0; i < indices.length; i++) {
            console.log("inside for");
            let idx = indices[i];
            console.log("idx is ", idx);
            guess_bar[idx] = value;
        }
        console.log(guess_bar);
        let guess_str = guess_bar.join(" ");
        console.log(guess_str);
        this.setState({guessBar: guess_str});
    }

    reset() {
        let type;
        let word;
        if (Math.random() <= 0.5) {
            type = "food";
            word = randomFood();
        } else {
            type = "programming language";
            word = randomLanguage();
        }
        this.setState(
            {type:type,
                chancesLeft: 6,
            answer: word,
            guessedLetters: new Set(),
            correctLetters: new Set(),
            status: "There are 6 chances left!",
            guessBar: "_ ".repeat(word.length),
            gallow_idx: 0}
        )
    }

    handleLetterClick(value) {
        let status;
        let gallow_idx = this.state.gallow_idx;
        let chancesLeft = this.state.chancesLeft;
        let guessedLetters = new Set(this.state.guessedLetters);
        let correctLetters = new Set(this.state.correctLetters);
        //let hasWon = this.checkWinning();
        guessedLetters.add(value);
        if (chancesLeft > 0 && !this.isGuessed(value)) {
            if (this.state.answer.includes(value)) {
                this.updateGuessBar(value);
                correctLetters.add(value);
            } else {
                chancesLeft--;
                gallow_idx++;
            }
        }
        if (this.checkWinning(correctLetters, chancesLeft)) {
            status = "You won!";
        } else if (chancesLeft > 0) {
            status = "There are " + chancesLeft + " chances left!";
        } else {
            status = "You lost!"
        }
        this.setState(
            {status : status,
                chancesLeft: chancesLeft,
                gallow_idx: gallow_idx,
                guessedLetters: guessedLetters,
                correctLetters: correctLetters,
            }
        );
    }

    render() {
        return (
            <div className="game">
                <div className="top">
                    <div className="byside">
                        {this.renderGallow()}
                        {this.renderStatus()}
                    </div>
                    <div className="byside">
                        <label className="label"> Guess a {this.state.type}! </label>
                        {this.renderGuessBar()}
                    </div>
                </div>
                <div className="keyboard">
                    {this.renderKeyboard()}
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Game />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




