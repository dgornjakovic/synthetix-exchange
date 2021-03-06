import { SYNTHS_MAP } from 'src/constants/currency';

export const MARKETS_REFRESH_INTERVAL_MS = 30000;

export const PAIRS = [
	{
		baseCurrencyKey: SYNTHS_MAP.sETH,
		quoteCurrencyKey: SYNTHS_MAP.sUSD,
	},
	{
		baseCurrencyKey: SYNTHS_MAP.sBTC,
		quoteCurrencyKey: SYNTHS_MAP.sUSD,
	},
	{
		baseCurrencyKey: SYNTHS_MAP.sXRP,
		quoteCurrencyKey: SYNTHS_MAP.sUSD,
	},
	{
		baseCurrencyKey: SYNTHS_MAP.sLTC,
		quoteCurrencyKey: SYNTHS_MAP.sUSD,
	},
	{
		baseCurrencyKey: SYNTHS_MAP.sBNB,
		quoteCurrencyKey: SYNTHS_MAP.sUSD,
	},
	{
		baseCurrencyKey: SYNTHS_MAP.sXTZ,
		quoteCurrencyKey: SYNTHS_MAP.sUSD,
	},
	{
		baseCurrencyKey: SYNTHS_MAP.sTRX,
		quoteCurrencyKey: SYNTHS_MAP.sUSD,
	},
	{
		baseCurrencyKey: SYNTHS_MAP.sLINK,
		quoteCurrencyKey: SYNTHS_MAP.sUSD,
	},
];
