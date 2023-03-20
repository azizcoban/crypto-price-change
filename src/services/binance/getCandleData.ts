import { client } from "./client";

export const getCandleData = async (
  symbol: string,
  interval: string,
  limit: number
) => {
  const response = await client.uiklines(symbol, interval, { limit });
  return response.data;
};
