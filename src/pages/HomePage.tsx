import React, { useState, useCallback } from 'react';
import { useStartGame } from '../hooks/useGameFetchHook';
import { useGamePostHistory } from '../hooks/useGamePostHistory';
import { useAuth } from '../components/authcontext';


const GameComponent: React.FC = () => {
  const { data: gameData, isLoading, error, refetch } = useStartGame();

  const {postHistory} = useGamePostHistory()

  // State management
  const [answer, setAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [resultColor, setResultColor] = useState<string>('');
  const [lives, setLives] = useState<number>(3);
  const {} = useAuth()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const userAnswer = parseFloat(answer);

      // Validate input and provide feedback
      if (isNaN(userAnswer) || userAnswer <= 0) {
        setResultMessage('Please enter a positive number.');
        setResultColor('text-red-500');
      } else if (userAnswer === gameData?.solution) {
        // Show custom modal when the answer is correct
        // const data ={"game_won": true, "id": user.id, "point_earned" : 100}
        setIsModalOpen(true);
        
        // Reset the game state after correct answer
        setResultMessage('');
        setResultColor('');
        refetch();
        setLives(3);  // Reset lives after correct answer
      } else {
        if (lives === 1) {
          setResultMessage(`Incorrect answer. The correct answer was ${gameData?.solution}.`);
          setResultColor('text-red-500');
        } else {
          setResultMessage(`Incorrect answer. You have ${lives - 1} lives left.`);
          setResultColor('text-red-500');
        }
        setLives((prevLives) => Math.max(prevLives - 1, 0)); // Decrease lives, ensuring no negative values
      }

      setSubmitted(true);
    },
    [answer, gameData?.solution, lives, refetch]
  );

  // Reset the game and refetch a new question
  const handleSkip = useCallback(() => {
    setAnswer('');
    setResultMessage('');
    setResultColor('');
    setSubmitted(false);
    setLives(3); // Reset lives
    refetch(); // refetch new game data
  }, [refetch]);

  const handleRetry = useCallback(() => {
    setAnswer('');
    setResultMessage('');
    setResultColor('');
    setSubmitted(false);
    setLives(3); // Reset lives on retry
    refetch(); // refetch new game data
    setIsModalOpen(false); // Close the modal after retry
  }, [refetch]);

  // Loading state UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500">Error: {error || 'An error occurred'}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Main Game UI
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-yellow-600">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        {gameData?.question ? (
          <>
            <p className="text-2xl font-bold text-center text-gray-900 mb-4">Game Question</p>
            <img src={gameData.question} alt="Game Question" className="rounded-md mb-4" />

            <form onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
                
                <button
                  type="button"
                  onClick={handleSkip}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  disabled={lives === 0} // Disable submit button if no lives
                >
                  Submit
                </button>
              </div>
            </form>

            {submitted && (
              <p className={`${resultColor} mt-4 text-center`}>{resultMessage}</p>
            )}

            {lives === 0 && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleRetry}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Retry
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center">No game data available.</p>
        )}
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-green-500">Correct Answer!</h2>
            <p className="mt-2 text-lg">Well done, you answered correctly!</p>
            <div className="mt-4">
              <button
                onClick={handleRetry}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameComponent;
