import { useEffect, useState } from "react";
import { QuestionBank } from "./QuestionBank"




const Question = (props: any) => {
  const {num, checkUserAnswer} = props;
  const [ansChecked, setAnsChecked] = useState(false);
  const [ansCorrect, setAnsCorrect] = useState(false);
  const [currentQiestion, setCurrentQuestion] = useState("")
  let newQuestion = QuestionBank.filter((question, index, arr) => {
    return index === num - 1;
    });

  // console.log(newQuestion);
  // console.log(num);
  
  useEffect(() => {
    setAnsChecked(false)
    setAnsCorrect(false)
  }, [num])

  const myQuestion = newQuestion[0];


  function checkAnswer(status: boolean, question: string){
    if(currentQiestion !== question){
      setAnsChecked(true);
      setCurrentQuestion(question);
      if (status === true){
        setAnsCorrect(true)
      }
    }
  }

  return(
    <div className="questions">
      <p className="question">{num}. {myQuestion?.question}</p>
        {(ansChecked && ansCorrect) ? (<div className="answerStatus">correct</div>) : (ansChecked && !ansCorrect)? (<div className="answerStatus">wrong</div>) : null}
      <div className="options">
        <div className="option" onClick={() => {checkUserAnswer(myQuestion.answers[0].status, myQuestion.question);
        checkAnswer(myQuestion.answers[0].status, myQuestion.question)}}>
          {myQuestion.answers[0].answer}
        </div>

        <div className="option" onClick={() => {checkUserAnswer(myQuestion.answers[1].status, myQuestion.question);
        checkAnswer(myQuestion.answers[1].status, myQuestion.question)}}>
          {myQuestion.answers[1].answer}
        </div>

        <div className="option" onClick={() => {checkUserAnswer(myQuestion.answers[2].status, myQuestion.question);
        checkAnswer(myQuestion.answers[2].status, myQuestion.question )}}>
          {myQuestion.answers[2].answer}
        </div>

        <div className="option" onClick={() => {checkUserAnswer(myQuestion.answers[3].status, myQuestion.question);
        checkAnswer(myQuestion.answers[3].status, myQuestion.question)}}>
          {myQuestion.answers[3].answer}
        </div>

      </div>
    </div>
  )
}

export default Question