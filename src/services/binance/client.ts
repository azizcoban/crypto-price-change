const { Spot } = require("@binance/connector");
const { Console } = require("console");

export const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
});

export const client = new Spot(
  process.env.NEXT_PUBLIC_BINANCE_API_KEY,
  process.env.NEXT_PUBLIC_BINANCE_API_SECRET,
  {
    logger,
    baseURL: process.env.NEXT_PUBLIC_BINANCE_BASE_URL,
  }
);
