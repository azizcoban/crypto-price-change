import { client } from "./client";

export const getPriceChanges = async (
  windowSize: string,
  symbols: string[]
) => {
  const response = await client.rollingWindowTicker("", symbols, {
    windowSize,
  });
  return response.data;
};
