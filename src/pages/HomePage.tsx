import React, { useState, useCallback } from "react";
import { useStartGame } from "../hooks/useGameFetchHook";
import {
  GamePostHistoryData,
  useGamePostHistory,
} from "../hooks/useGamePostHistory";
import { useAuth } from "../components/authcontext";

const HomePage: React.FC = () => {
  const { data: gameData, isLoading, error, refetch } = useStartGame();
  const { postHistory } = useGamePostHistory();
  const { isAuthenticated, logout } = useAuth(); // Accessing the logout function

  const [answer, setAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [resultColor, setResultColor] = useState<string>("");
  const [lives, setLives] = useState<number>(3);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<GamePostHistoryData[]>([]); // Array to store each attempt

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const userAnswer = parseFloat(answer);
      let historyData;

      if (isNaN(userAnswer) || userAnswer <= 0) {
        setResultMessage("Please enter a positive number.");
        setResultColor("text-red-500");
        historyData = { game_won: false, point_earned: 0 };
      } else if (userAnswer === gameData?.solution) {
        setIsModalOpen(true);
        setResultMessage("");
        setResultColor("");
        historyData = { game_won: true, point_earned: 100 };

        refetch();
        setLives(3);
      } else {
        if (lives === 1) {
          setResultMessage(
            `Incorrect answer. The correct answer was ${gameData?.solution}.`
          );
          setResultColor("text-red-500");
          historyData = { game_won: false, point_earned: 0 };
        } else {
          setResultMessage(
            `Incorrect answer. You have ${lives - 1} lives left.`
          );
          setResultColor("text-red-500");
          historyData = { game_won: false, point_earned: 0 };
        }
        setLives((prevLives) => Math.max(prevLives - 1, 0));
      }

      await postHistory(historyData);

      // Add new attempt and limit to 3 attempts
      setAttempts((prevAttempts) => {
        const updatedAttempts = [...prevAttempts, historyData];
        return updatedAttempts.length > 3
          ? updatedAttempts.slice(-3)
          : updatedAttempts;
      });

      setAnswer(""); // Clear the input field after submitting
      setSubmitted(true);
    },
    [answer, gameData?.solution, lives, refetch, postHistory]
  );

  const handleSkip = useCallback(() => {
    setAnswer("");
    setResultMessage("");
    setResultColor("");
    setSubmitted(false);
    setLives(3);
    setAttempts([]); // Reset attempts history
    refetch();
  }, [refetch]);

  const handleRetry = useCallback(() => {
    setAnswer("");
    setResultMessage("");
    setResultColor("");
    setSubmitted(false);
    setLives(3);
    setAttempts([]); // Reset attempts history
    refetch();
    setIsModalOpen(false);
  }, [refetch]);

  const handleLogout = () => {
    logout(); // Trigger logout from the context
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500">Error: {error || "An error occurred"}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-yellow-600 p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Welcome to Banana Game
        </h1>
        <h3 className="mt-2 text-lg text-gray-100">
          Guess the correct number
        </h3>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex-1 max-w-md w-full p-6 bg-white rounded-md shadow-md mr-6">
          {gameData?.question ? (
            <>
              <p className="text-2xl font-bold text-center text-gray-900 mb-4">
                Game Question
              </p>
              <img
                src={gameData.question}
                alt="Game Question"
                className="rounded-md mb-4"
              />

              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  placeholder="Enter your answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Enter your answer"
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
                    disabled={lives === 0}
                  >
                    Submit
                  </button>
                </div>
              </form>

              {submitted && (
                <p className={`${resultColor} mt-4 text-center`}>
                  {resultMessage}
                </p>
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

        <div className="w-64 h-[425px] p-4 bg-gray-100 rounded-md overflow-y-auto shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Game History
          </h2>
          {attempts.length > 0 ? (
            <ul className="space-y-2">
              {attempts.map((attempt, index) => (
                <li key={index} className="text-gray-600">
                  Attempt {index + 1}: {attempt.game_won ? "Won" : "Lost"},
                  Points: {attempt.point_earned}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No attempts yet.</p>
          )}
        </div>
      </div>
      {/* Game Section */}

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-green-500">
              Correct Answer!
            </h2>
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

      {/* Logout Button */}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default HomePage;
