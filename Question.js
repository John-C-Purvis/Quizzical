import React from "react"

export default function Question(props) {
    
    const [trivia, setTrivia] = React.useState([
        {id: null,
        category: "",
        question: "",
        correct_answer: "",
        incorrect_answers: [""]}
    ])
    
    const [choices, setChoices] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=1&difficulty=easy")
            .then(res => res.json())
            .then(data => setTrivia(data.results))
    }, [])
    
    React.useEffect(() => {
        updateChoices()
    }, [trivia])    
    
    const htmlDecode = (input) => {
        const doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }
    
    function updateChoices() {
        let choicePool = []
        choicePool[0] = {
            id: 0,
            text: trivia[0].correct_answer,
            isCorrect: true,
            isSelected: false
        }
        for(let i = 1; i <= trivia[0].incorrect_answers.length; i++) {
            choicePool.push({
                id: i,
                text: trivia[0].incorrect_answers[i - 1],
                isCorrect: false,
                isSelected: false
            })
        }
        let randomizedChoices = []
        for(let i = 0; i < trivia[0].incorrect_answers.length + 1; i++) {
            const index = Math.floor(Math.random() * choicePool.length)
            randomizedChoices.push(choicePool[index])
            choicePool.splice(index, 1)
        }
        setChoices(randomizedChoices)
    }
    
    function handleClick(event, param) {
        event.preventDefault()
        if(props.display === "challenge") {
            setChoices(choices.map(choice => {
                if(choice.id === param) {
                    return {
                        ...choice,
                        isSelected: true
                    }
                }
                return {
                    ...choice,
                    isSelected: false
                };
            }))
        }
    } 
    
    function getClass(param) {
        if(props.display === "challenge") {
            if(param.isSelected) return "question-selected"
            return "question-choice"
        }
        if(props.display === "answers") {
            if(param.isSelected && param.isCorrect) {
                return "question-correct"
            }
            if(param.isSelected && !param.isCorrect) return "question-incorrect"
            if(!param.isSelected && param.isCorrect) return "question-correct"
            return "question-inactive"
        }
    }
    
    return (
        <div className="question-container">
            <h2 className="question-challenge">{htmlDecode(trivia[0].question)}</h2>
            <ul className="question-choice-container">
                {choices[0] && 
                    <li 
                        className={getClass(choices[0])}
                        onMouseDown={event => handleClick(event, choices[0].id)}
                        onMouseUp={event => props.updateCorrect(props.id, choices[0].isSelected && choices[0].isCorrect)}
                    >
                    {htmlDecode(choices[0].text)}
                    </li>
                }
                {choices[1] && 
                    <li
                        className={getClass(choices[1])}
                        onMouseDown={event => handleClick(event, choices[1].id)}
                        onMouseUp={event => props.updateCorrect(props.id, choices[1].isSelected && choices[1].isCorrect)}
                    >
                    {htmlDecode(choices[1].text)}
                    </li>
                }
                {choices[2] && 
                    <li
                        className={getClass(choices[2])}
                        onMouseDown={event => handleClick(event, choices[2].id)}
                        onMouseUp={event => props.updateCorrect(props.id, choices[2].isSelected && choices[2].isCorrect)}
                    >
                    {htmlDecode(choices[2].text)}
                    </li>
                }
                {choices[3] && 
                    <li
                        className={getClass(choices[3])}
                        onMouseDown={event => handleClick(event, choices[3].id)}
                        onMouseUp={event => props.updateCorrect(props.id, choices[3].isSelected && choices[3].isCorrect)}
                    >
                    {htmlDecode(choices[3].text)}
                    </li>
                }
            </ul>
            <hr className="question-divider"/>
        </div>
    )
}
