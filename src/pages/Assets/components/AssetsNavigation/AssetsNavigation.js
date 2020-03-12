import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Link from 'src/components/Link';

import { ROUTES } from 'src/constants/routes';

import { labelMediumCSS } from 'src/components/Typography/Label';

const AssetsNavigation = memo(() => {
	const { t } = useTranslation();

	return (
		<List>
			<ListItem>
				<ListItemLink to={ROUTES.Assets.Overview}>{t('assets.navigation.overview')}</ListItemLink>
			</ListItem>
			<ListItem>
				<ListItemLink to={ROUTES.Assets.Transactions}>
					{t('assets.navigation.transactions')}
				</ListItemLink>
			</ListItem>
		</List>
	);
});

const List = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const ListItem = styled.li``;

const ListItemLink = styled(Link)`
	${labelMediumCSS};
	padding: 13px 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-transform: uppercase;
	color: ${props => props.theme.colors.fontSecondary};
	background-color: ${props => props.theme.colors.surfaceL2};
	&:hover {
		color: ${props => props.theme.colors.fontPrimary};
		background-color: ${props => props.theme.colors.accentDark};
	}
	&.active {
		background-color: ${props => props.theme.colors.accentLight};
		color: ${props => props.theme.colors.fontPrimary};
	}
`;

export default AssetsNavigation;
