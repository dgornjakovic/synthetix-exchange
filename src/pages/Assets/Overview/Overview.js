import React, { memo } from 'react';
import PropTypes from 'prop-types';

import YourAssets from './YourAssets';

const MOCK_ASSETS = [
	{
		asset: 'sUSD',
		total: '22000',
		pendingTotal: '0',
	},
];

export const Overview = memo(() => (
	<>
		<YourAssets assets={MOCK_ASSETS} />
	</>
));

YourAssets.propTypes = {
	assets: PropTypes.array.isRequired,
};

export default Overview;
