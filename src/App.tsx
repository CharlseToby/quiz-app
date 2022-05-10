import React, { useEffect, useState } from 'react';
import './App.scss';
import Question from './components/Question';
import { QuestionBank } from './components/QuestionBank';



// type AnswerObject = {
//   question: string,
//   answer: string,
//   status: boolean,
// }

// type QuestionObject = {
//   question: string,
//   answer:
//     {
//       name: string,
//       answer: string,
//       status: boolean,
//     }[];
  
// }

function App() {

  // States
  const [score, setScore] = useState(0)
  const [endQuiz, setEndQuiz] = useState(true);
  const [questionNum, setQuestionNum] = useState(1)
  const [answered, setAnswered] = useState(false);
  const [viewScore, setViewScore] = useState(false);
  const [currentQiestion, setCurrentQuestion] = useState("");

  // Function to start the quiz
  const startQuiz = () => {
    setEndQuiz(false);
    setScore(0);
    setViewScore(false);  
  }

  // function to  open next question in the question bank
  function nextQuestion(){
    if(questionNum !== QuestionBank.length){
      setQuestionNum(questionNum + 1)
    }
  }

  // Function to reset the answered state when new question is loaded
  useEffect(() => {
    setAnswered(false)
  }, [questionNum])

  // function to check the user's answer and change the score
  function checkUserAnswer(status:boolean, question: string){
    if(currentQiestion !== question){
      setAnswered(true);
      setCurrentQuestion(question);
      if(status === true){
        setScore(prev => {
          return prev + 1
        })
      }
    }
  }

  // function to view the total score after quiz.
  function viewScoreHandler() {
    setEndQuiz(true);
    setViewScore(true);
    setQuestionNum(1)
  }


  return (
    <div className="App">
      <h1 className='App-header'>QUIZ</h1>

      {viewScore? (
        <div>
          <p>Your total score is</p>
          <h2>{score}/{QuestionBank.length}</h2>
        </div>
      ) : null}
      
      {endQuiz? (
        <button className='btn-start' onClick={startQuiz}>
          start Quiz
        </button>
      ) : (
        <div className="questionDOM">
          <h1 className='questionDOM-header'>Question</h1>
          <p className='instruction'>Read the question and choose the most correct option</p>
          <Question num={questionNum} checkUserAnswer={checkUserAnswer}/>

          {(answered && (questionNum < QuestionBank.length)) ? (
            <button className='btn' onClick={nextQuestion}>Next</button>
          ) : null}
          {((QuestionBank.length === questionNum) && answered) ? (<button className='btn' onClick={viewScoreHandler}>View Score</button>) : null}
        </div>
      )}
      
    </div>
  );
}

export default App;
