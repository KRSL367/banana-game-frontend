import { useState } from "react";
import { ApiResponse, usePostData } from "./usePostData";

export interface GamePostHistoryData {
  Userid?: number;
  game_won?: boolean;
  point_earned?: number;
}


export const useGamePostHistory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GamePostHistoryData | null>(null);


  const postHistory = async (historyData: GamePostHistoryData): Promise<void> => {

    setIsLoading(true);
    setError(null);

    const response: ApiResponse<GamePostHistoryData> = await usePostData<GamePostHistoryData>(
      "game-history",
      historyData,
    );

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.data);
    }

    setIsLoading(false);
  };

  return {
    postHistory,
    data,
    isLoading,
    error,
  };
};