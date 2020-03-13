import { createSlice, createSelector } from '@reduxjs/toolkit';
import orderBy from 'lodash/orderBy';

import { LOCAL_STORAGE_KEYS } from 'src/constants/storage';
import { CRYPTO_CURRENCY_MAP } from 'src/constants/currency';

import { setSigner } from '../utils/snxJSConnector';
import { getAddress } from '../utils/formatters';
import { defaultNetwork } from '../utils/networkUtils';

import { fetchSynthsBalance, fetchEthBalance } from '../dataFetcher';
import { getAvailableSynths } from './synths';

const initialState = {
	walletType: '',
	unlocked: false,
	unlockError: null,
	walletPaginatorIndex: 0,
	availableWallets: [],
	currentWallet: null,
	derivationPath: localStorage.getItem(LOCAL_STORAGE_KEYS.WALLET_DERIVATION_PATH),
	balances: null,
	networkId: defaultNetwork.networkId,
	networkName: defaultNetwork.name,
	isFetchingWalletBalances: false,
};

export const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		resetWalletReducer: () => {
			return initialState;
		},
		updateWalletReducer: (state, action) => {
			const { payload } = action;

			return {
				...state,
				...payload,
				currentWallet: payload.currentWallet
					? getAddress(payload.currentWallet)
					: state.currentWallet,
			};
		},
		updateWalletPaginatorIndex: (state, action) => {
			state.walletPaginatorIndex = action.payload;
		},
		updateNetworkSettings: (state, action) => {
			const { networkId, networkName } = action.payload;

			state.networkId = networkId;
			state.networkName = networkName;
		},
		setDerivationPath: (state, action) => {
			const { signerOptions, derivationPath } = action.payload;

			/* TODO: move this side effect to a saga */
			setSigner(signerOptions);
			localStorage.setItem(LOCAL_STORAGE_KEYS.WALLET_DERIVATION_PATH, derivationPath);

			state.derivationPath = derivationPath;
			state.availableWallets = [];
			state.walletPaginatorIndex = 0;
		},
		fetchWalletBalancesRequest: state => {
			state.isFetchingWalletBalances = true;
		},
		fetchWalletBalancesSuccess: (state, action) => {
			const { balances } = action.payload;

			state.balances = balances;
			state.isFetchingWalletBalances = false;
		},
		fetchWalletBalancesFailure: state => {
			state.isFetchingWalletBalances = false;
		},
	},
});

export const getWalletState = state => state.wallet;
export const getNetworkId = state => getWalletState(state).networkId;
export const getNetworkName = state => getWalletState(state).networkName;
export const getNetwork = state => ({
	networkId: getNetworkId(state),
	networkName: getNetworkName(state),
});
export const getCurrentWalletAddress = state => getWalletState(state).currentWallet;
export const getWalletBalancesMap = state => getWalletState(state).balances;

export const getTotalWalletBalanceUSD = createSelector(getWalletBalancesMap, walletBalances => {
	if (walletBalances == null) {
		return 0;
	}
	let sumUSD = 0;
	const { eth, synths } = walletBalances;
	if (eth) {
		sumUSD += walletBalances.eth.usdBalance;
	}
	if (synths) {
		sumUSD += walletBalances.synths.usdBalance;
	}
	return sumUSD;
});

export const getWalletBalances = createSelector(getWalletBalancesMap, walletBalances => {
	if (walletBalances == null) {
		return [];
	}

	const { eth, synths } = walletBalances;

	let assets = [];

	if (eth) {
		assets.push({
			name: CRYPTO_CURRENCY_MAP.ETH,
			...eth,
		});
	}

	Object.keys(synths.balances).forEach(currencyKey => {
		const synth = synths.balances[currencyKey];
		if (synth && synth.balance > 0) {
			assets.push({ name: currencyKey, ...synth });
		}
	});

	return orderBy(assets, 'usdBalance', 'desc');
});

const {
	addAvailableWallets,
	updateNetworkSettings,
	resetWalletReducer,
	updateWalletReducer,
	setDerivationPath,
	updateWalletPaginatorIndex,
	fetchWalletBalancesRequest,
	fetchWalletBalancesSuccess,
	fetchWalletBalancesFailure,
} = walletSlice.actions;

export const fetchWalletBalances = () => async (dispatch, getState) => {
	const state = getState();
	const synths = getAvailableSynths(state);

	const currentWalletAddress = getCurrentWalletAddress(state);

	if (currentWalletAddress != null) {
		dispatch(fetchWalletBalancesRequest());
		try {
			const [synthsBalance, ethBalance] = await Promise.all([
				fetchSynthsBalance(currentWalletAddress, synths),
				fetchEthBalance(currentWalletAddress),
			]);

			const balances = { synths: synthsBalance, eth: ethBalance };

			dispatch(fetchWalletBalancesSuccess({ balances }));

			return true;
		} catch (e) {
			dispatch(fetchWalletBalancesFailure());

			return false;
		}
	}
	return false;
};

export default walletSlice.reducer;

export {
	addAvailableWallets,
	updateNetworkSettings,
	setDerivationPath,
	resetWalletReducer,
	updateWalletReducer,
	updateWalletPaginatorIndex,
	fetchWalletBalancesRequest,
	fetchWalletBalancesSuccess,
	fetchWalletBalancesFailure,
};
