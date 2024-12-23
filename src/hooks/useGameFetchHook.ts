import { useFetchData } from "../hooks/useFetchData"; // Adjust the import path as necessary

export interface GameData {
  question: string;
  solution: number;
}

export const useStartGame = () => {
  const { data, isLoading, error, refetch } = useFetchData<GameData>("fetch-game-data"); // Replace with your API endpoint

  return {
    data: data?.data, // Access the data from the ApiResponse structure
    isLoading,
    error: error?.message, // Handle error message if any
    refetch,
  };
};
