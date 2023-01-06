import React from "react"
import Question from "./Question"

export default function App() {
    
    const [mode, setMode] = React.useState("intro")
    
    const [score, setScore] = React.useState(0)
    
    let correctAnswers = [false, false, false, false, false]
    
    function changeMode() {
        if(mode === "intro") setMode("challenge")
        else if(mode === "challenge") setMode("answers")
        else {
            setMode("intro")
            setScore(0)
        }
    }
    
    function updateCorrect(id, isRight) {
        correctAnswers[id] = isRight
    }
    
    function tallyScore() {
        let tally = 0;
        for(let i = 0; i < 5; i++) {
            if(correctAnswers[i]) tally++
        }
        setScore(tally)
    }
    
    return (
        <div>
            {(mode === "intro") && <div className="cover-container">
                <h1 className="cover-title">Quizzical</h1>
                <h3 className="cover-desc">Test your trivia knowledge</h3>
                <button className="cover-button" onClick={changeMode}>Start quiz</button>
            </div>}
            {(mode !== "intro") && <div className="quiz-container">
                <Question display={mode} id="0" updateCorrect={updateCorrect} />
                <Question display={mode} id="1" updateCorrect={updateCorrect} />
                <Question display={mode} id="2" updateCorrect={updateCorrect} />
                <Question display={mode} id="3" updateCorrect={updateCorrect} />
                <Question display={mode} id="4" updateCorrect={updateCorrect} />
                <h4 className="quiz-score">You scored {score}/5 correct answers</h4>
                {(mode === "challenge") && <button className="quiz-button" onMouseUp={changeMode}  onMouseDown={tallyScore}>Check answers</button>}
                {(mode === "answers") && <button className="quiz-button" onMouseUp={changeMode}    onMouseDown={tallyScore}>Play again</button>}
            </div>}
        </div>
    )
}
