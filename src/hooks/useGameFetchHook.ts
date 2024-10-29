import { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData"; // Adjust the import path as necessary

export interface GameData {
  question: string; // Assuming imgurl is a string
  solution: number;
}

export const useStartGame = () => {
  const [data, setData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGameData = async () => {
    setIsLoading(true);
    setError(null);

    const response = await useFetchData<GameData>("fetch-game-data"); // Replace with your API endpoint

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchGameData();
  }, []); // Fetch data on mount

  return {
    data,
    isLoading,
    error,
  };
};
