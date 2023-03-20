import { client } from "./client";

export const getStreamPriceData = async (
  interval: string,
  symbol: string,
  callbacks: any
) => {
  const wsRef = await client.rollingWindowTickerWS(interval, symbol, callbacks);

  setTimeout(() => client.unsubscribe(wsRef), 60000);
};
