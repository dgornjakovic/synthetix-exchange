import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Table from 'src/components/Table';
import Currency from 'src/components/Currency';
import Card from 'src/components/Card';
import { HeadingSmall } from 'src/components/Typography';
import { ButtonPrimary } from 'src/components/Button';
import Link from 'src/components/Link';

import { getAvailableSynthsMap } from 'src/ducks/synths';
import { LINKS } from 'src/constants/links';

export const YourAssets = memo(({ assets, synthsMap }) => {
	const { t } = useTranslation();

	return (
		<Card>
			<Card.Header>
				<HeadingSmall>{t('assets.overview.your-assets.title')}</HeadingSmall>
			</Card.Header>
			<StyledCardBody>
				<Table
					palette="striped"
					columns={[
						{
							Header: t('assets.overview.your-assets.table.asset-col'),
							accessor: 'asset',
							Cell: cellProps => (
								<Currency.Name currencyKey={cellProps.cell.value} showIcon={true} />
							),
							width: 150,
							sortable: true,
						},
						{
							Header: t('assets.overview.your-assets.table.asset-description-col'),
							id: 'asset-desc',
							Cell: cellProps => {
								const currencyKey = cellProps.row.original.asset;
								const desc = synthsMap[currencyKey] && synthsMap[currencyKey].desc;

								return <span>{desc}</span>;
							},
							width: 150,
						},
						{
							Header: t('assets.overview.your-assets.table.total-col'),
							accessor: 'total',
							Cell: cellProps => <span>{cellProps.cell.value}</span>,
							width: 150,
							sortable: true,
						},
						{
							Header: t('assets.overview.your-assets.table.pending-txs-col'),
							accessor: 'pendingTotal',
							Cell: cellProps => <span>{cellProps.cell.value}</span>,
							sortable: true,
						},
						{
							Header: t('assets.overview.your-assets.table.actions-col'),
							accessor: 'actions',
							width: 250,
							Cell: () => (
								<ActionsCol>
									<Link to={LINKS.Tokens} isExternal={true}>
										<ButtonPrimary size="xs">{t('common.actions.info')}</ButtonPrimary>
									</Link>
									<ButtonPrimary size="xs">{t('common.actions.trade')}</ButtonPrimary>
									<ButtonPrimary size="xs">{t('common.actions.convert-to-eth')}</ButtonPrimary>
								</ActionsCol>
							),
						},
					]}
					data={assets}
				/>
			</StyledCardBody>
		</Card>
	);
});

const ActionsCol = styled.div`
	display: inline-grid;
	grid-gap: 11px;
	grid-auto-flow: column;
`;

const StyledCardBody = styled(Card.Body)`
	padding: 0;
`;

YourAssets.propTypes = {
	assets: PropTypes.array.isRequired,
	synthsMap: PropTypes.object,
};

const mapStateToProps = state => ({
	synthsMap: getAvailableSynthsMap(state),
});

export default connect(mapStateToProps, null)(YourAssets);
