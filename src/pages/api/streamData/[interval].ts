import { client, logger } from "@/services/binance/client";
import { NextApiRequest, NextApiResponse } from "next";
import sortBy from "lodash.sortby";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { interval } = req.query;

  const callbacks = {
    open: () => logger.debug("Connected with Websocket server"),
    close: () => logger.debug("Disconnected with Websocket server"),
    message: (data: any) => {
      const json = JSON.parse(data);

      const keyModifiedData = json.map((item: any) => {
        const { s, c, p, P } = item;
        return {
          symbol: s,
          priceChange: Number(p),
          priceChangePercent: Math.floor(P * 100) / 100,
          currentPrice: c,
        };
      });

      // Filter out only USDT pairs
      const newData = keyModifiedData.filter((item: any) =>
        item.symbol.includes("USDT")
      );

      const sortedData = sortBy(newData, "priceChangePercent").reverse();

      res.status(200).json(sortedData);
    },
  };

  try {
    const wsRef = client.rollingWindowTickerWS(interval, null, callbacks);
    setTimeout(() => client.unsubscribe(wsRef), 5000);
  } catch (err) {
    res.status(500).json({ message: "failed to fetch data" });
  }
}
