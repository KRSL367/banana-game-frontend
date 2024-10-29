import React, { useState } from 'react';
import { useStartGame } from '../hooks/useGameFetchHook';

const GameComponent: React.FC = () => {
  const { data: gameData, isLoading: loading, error } = useStartGame();
  
  // State management
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultColor, setResultColor] = useState('');

  // Handles form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userAnswer = parseFloat(answer);
    if (isNaN(userAnswer) || userAnswer <= 0) {
      setResultMessage('Please enter a positive number.');
      setResultColor('text-red-500');
    } else if (userAnswer === gameData?.solution) {
      setResultMessage('Correct answer! Well done!');
      setResultColor('text-green-500');
    } else {
      setResultMessage('Incorrect answer. Try again.');
      setResultColor('text-red-500');
    }
    setSubmitted(true);
  };

  // Skip functionality
  const handleSkip = () => {
    setAnswer('');
    setResultMessage('');
    setResultColor('');
    setSubmitted(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500">Error: {error || 'An error occurred'}</p>
        <button
          onClick={() => {}}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-yellow-600">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        {gameData?.question && (
          <>
            <p className="text-2xl font-bold text-center text-gray-900 mb-4">Game Question</p>
            <img src={gameData.question} alt="Game Question" className="rounded-md mb-4" />
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded"
              />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                  Submit
                </button>
                <button onClick={handleSkip} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
                  Skip
                </button>
              </div>
            </form>
            {submitted && (
              <p className={`${resultColor} mt-4 text-center`}>{resultMessage}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GameComponent;
