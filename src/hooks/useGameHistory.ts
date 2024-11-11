import { useFetchData } from "../hooks/useFetchData"; // Adjust the import path as necessary

export interface GameHistory {
  game_won: boolean;
  point_earned: number;
}

export const useStartGame = () => {
  const { data, isLoading, error, refetch } = useFetchData<GameHistory>("fetch-game-data"); // Replace with your API endpoint

  return {
    data: data?.data, // Access the data from the ApiResponse structure
    isLoading,
    error: error?.message, // Handle error message if any
    refetch,
  };
};
