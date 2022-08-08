import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import step0 from "./images/0.jpeg";
import step1 from "./images/1.jpeg";
import step2 from "./images/2.jpeg";
import step3 from "./images/3.jpeg";
import step4 from "./images/4.jpeg";
import step5 from "./images/5.jpeg";
import step6 from "./images/6.jpeg";
import {randomWord} from "./words/food";

import reportWebVitals from './reportWebVitals';

const word = "apple";

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function GuessBar(props) {
    let guessbar = "_ ";
    return (
        <div className="guess">
            {guessbar.repeat(props.len)}
        </div>
    );
}

class Guess extends React.Component {
    banner = "There are " + this.props.chancesLeft.toString() + " chances left!";
    render() {
        return (
            <div>
                <div>
                    {this.banner}
                </div>
                <GuessBar len = {word.length}/>
            </div>
        );
    }
}

class Gallow extends React.Component {
    render() {
        return (
            <div className="gallow">
                <img alt={'gallows'} src={step0}/>
            </div>
        );
    }
}

function Letter(props) {
    return (
        <button
            className="letter"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class KeyBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            letters: alphabet,
        }
    }

    renderLetter(i) {
        return <Letter
            value = {this.state.letters[i]}
            onClick = {() => this.handleClick()}
            />;
    }

    render() {
        const letters = this.state.letters;
        return (
            <div className={"keyboard"}>
                {letters.map((letter, i) => (
                    <Letter
                        value={letter}
                        onClick={this.handleClick()}
                    />
                    ))}
                <button className={'resetBtn'}>Reset</button>
            </div>
        );
    }

    handleClick() {
        return {

        }

    }
}

class Game extends React.Component {
    static imageSet = [step0, step1, step2, step3, step4, step5, step6];

    constructor(props) {
        super(props);
        this.state = {
            chancesLeft: 6,
            answer: word,
            guessedLetters: new Set(),
        }
    }

    render() {
        return (
            <div className="game">
                <div className="top">
                    <Gallow />
                    <Guess chancesLeft = {this.state.chancesLeft}/>
                </div>
                <div className="keyboard">
                    <KeyBoard
                        onClick = {() => this.handleClick()}/>
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




