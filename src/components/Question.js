import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if (timeRemaining === 0) {
      // When the time runs out, reset to 10 seconds and trigger onAnswered with false
      setTimeRemaining(10); // Reset the timer
      onAnswered(false); // Call onAnswered with false to indicate time is up
    }

    const timer = setTimeout(() => {
      setTimeRemaining((prev) => prev - 1); // Decrease timeRemaining by 1 every second
    }, 1000);

    // Cleanup the timer when the component unmounts or timeRemaining changes
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); // Effect runs when timeRemaining or onAnswered changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer when an answer is clicked
    onAnswered(isCorrect); // Pass whether the answer is correct
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
