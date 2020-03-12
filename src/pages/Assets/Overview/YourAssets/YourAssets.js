import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Table from 'src/components/Table';
import Currency from 'src/components/Currency';
import Card from 'src/components/Card';
import { HeadingSmall } from 'src/components/Typography';
import { ButtonPrimary } from 'src/components/Button';

export const YourAssets = memo(({ assets }) => {
	const { t } = useTranslation();

	return (
		<Card>
			<Card.Header>
				<HeadingSmall>{t('assets.your-assets.title')}</HeadingSmall>
			</Card.Header>
			<Card.Body>
				<Table
					palette="striped"
					columns={[
						{
							Header: t('assets.your-assets.table.asset-col'),
							accessor: 'asset',
							Cell: cellProps => (
								<Currency.Name currencyKey={cellProps.cell.value} showIcon={true} />
							),
							width: 150,
							sortable: true,
						},
						{
							Header: t('assets.your-assets.table.asset-col'),
							accessor: 'asset-description',
							Cell: cellProps => cellProps.cell.value,
							width: 150,
						},
						{
							Header: t('assets.your-assets.table.asset-col'),
							accessor: 'total',
							Cell: cellProps => cellProps.cell.value,
							width: 150,
							sortable: true,
						},
						{
							Header: t('assets.your-assets.table.asset-col'),
							accessor: 'pendingTotal',
							Cell: cellProps => cellProps.cell.value,
							width: 150,
							sortable: true,
						},
						{
							Header: t('assets.your-assets.table.actions-col'),
							accessor: 'actions',
							Cell: () => (
								<ActionsCol>
									<ButtonPrimary size="sm">{t('common.actions.info')}</ButtonPrimary>
									<ButtonPrimary size="sm">{t('common.actions.trade')}</ButtonPrimary>
									<ButtonPrimary size="sm">{t('common.actions.convert-to-eth')}</ButtonPrimary>
								</ActionsCol>
							),
						},
					]}
					data={assets}
				/>
			</Card.Body>
		</Card>
	);
});

const ActionsCol = styled.div`
	display: inline-grid;
	grid-gap: 11px;
`;

YourAssets.propTypes = {
	assets: PropTypes.array.isRequired,
};

export default YourAssets;
