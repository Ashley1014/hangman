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

class Game extends React.Component {
    static imageSet = [step0, step1, step2, step3, step4, step5, step6];

    constructor(props) {
        super(props);
        this.state = {
            chancesLeft: 6,
            answer: word,
            guessedLetters: new Set(),
            status: "There are 6 chances left!",
        }
        this.reset = this.reset.bind(this);
    }

    renderKeyboard() {
        return (
            <div className={"keyboard"}>
                {alphabet.map((letter, i) => (
                    <Letter
                        value={letter}
                        onClick={() => this.handleLetterClick(letter)}
                    />
                ))}
                <button className={'resetBtn'} onClick={this.reset} >Reset</button>
            </div>
        );
    }

    updateGuessBar() {


    }

    renderGuessBar() {
        return (
            <div>
                <GuessBar len = {word.length}/>
            </div>
        );
    }

    reset() {
        this.setState(
            {chancesLeft: 6,
            answer: word,
            guessedLetters: new Set(),
            status: "There are 6 chances left!"}
        )
    }

    handleLetterClick(value) {
        let status;
        if (this.state.chancesLeft > 0) {
            const chancesLeft = this.state.chancesLeft - 1;
            this.setState({chancesLeft: chancesLeft});
            if (this.state.answer.includes(value)) {
                const cloned = new Set(this.state.guessedLetters);
                cloned.add(value);
            }
            console.log(this.state.chancesLeft);
            status = "There are " + chancesLeft + " chances left!";
        } else {
            status = "You lost!"
        }
        this.setState({status : status});
    }

    render() {
        return (
            <div className="game">
                <div className="top">
                    <Gallow />
                    {this.state.status}
                    {this.renderGuessBar()}
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




