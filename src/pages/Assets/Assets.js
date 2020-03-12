import React, { memo } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ROUTES } from 'src/constants/routes';
import { CenteredPageLayout } from 'src/shared/commonStyles';
import AssetsNavigation from './components/AssetsNavigation';

import Overview from './Overview';
import Transactions from './Transactions';

const Assets = memo(() => (
	<Container>
		<AssetsNavigation />
		<Switch>
			<Route path={ROUTES.Assets.Overview} component={Overview} />
			<Route path={ROUTES.Assets.Transactions} component={Transactions} />
			<Redirect to={ROUTES.Assets.Overview} />
		</Switch>
	</Container>
));

const Container = styled(CenteredPageLayout)``;

export default Assets;
