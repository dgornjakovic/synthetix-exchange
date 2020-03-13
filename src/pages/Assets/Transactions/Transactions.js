import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Table from 'src/components/Table';
import Currency from 'src/components/Currency';
import Card from 'src/components/Card';
import { HeadingSmall } from 'src/components/Typography';
import { ButtonPrimary } from 'src/components/Button';

export const Transactions = memo(({ transactions }) => {
	const { t } = useTranslation();

	return (
		<Card>
			<Card.Header>
				<HeadingSmall>{t('assets.transactions.title')}</HeadingSmall>
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
							Cell: cellProps => <span>cellProps.cell.value</span>,
							width: 150,
						},
						{
							Header: t('assets.your-assets.table.asset-col'),
							accessor: 'total',
							Cell: cellProps => <span>cellProps.cell.value</span>,
							width: 150,
							sortable: true,
						},
						{
							Header: t('assets.your-assets.table.asset-col'),
							accessor: 'pendingTotal',
							Cell: cellProps => <span>cellProps.cell.value</span>,
							width: 150,
							sortable: true,
						},
						{
							Header: t('assets.your-assets.table.actions-col'),
							accessor: 'actions',
							Cell: () => (
								<ButtonPrimary size="sm">{t('common.actions.convert-to-eth')}</ButtonPrimary>
							),
						},
					]}
					data={transactions}
				/>
			</Card.Body>
		</Card>
	);
});

Transactions.propTypes = {
	transactions: PropTypes.array.isRequired,
};

export default Transactions;
