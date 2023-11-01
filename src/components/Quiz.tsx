import React, { useState, useEffect } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [quizCore, setQuizCore] = useState<QuizCore | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const qCore = new QuizCore();
    setQuizCore(qCore);
  }, []);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (quizCore) {
      quizCore.answerQuestion(selectedAnswer || ''); // Answer the current question
      setSelectedAnswer(null); // Clear the selected answer
      quizCore.nextQuestion(); // Move to the next question
    }
  };

  if (quizCore) {
    const currentQuestion = quizCore.getCurrentQuestion();

    if (!currentQuestion) {
      return (
        <div>
          <h2>Quiz Completed</h2>
          <p>Final Score: {quizCore.getScore()} out of {quizCore.getSize()}</p>
        </div>
      );
    }

    return (
      <div>
        <h2>Quiz Question:</h2>
        <p>{currentQuestion.question}</p>

        <h3>Answer Options:</h3>
        <ul>
          {currentQuestion.options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={selectedAnswer === option ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>

        <h3>Selected Answer:</h3>
        <p>{selectedAnswer || 'No answer selected'}</p>

        <button onClick={handleButtonClick}>Next Question</button>
      </div>
    );
  }

  // Render loading or error state while quizCore is initializing
  return <div>Loading quiz data...</div>;
};

export default Quiz;
