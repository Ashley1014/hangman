import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

class Guess extends React.Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

class Gallow extends React.Component {
    render() {
        return (
            <div>

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
                    <Letter value={letter}/>
                    ))}
            </div>
        );
    }

    handleClick() {
        return {

        }

    }
}

class Game extends React.Component {
    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <KeyBoard />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
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




