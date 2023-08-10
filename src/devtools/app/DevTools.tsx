import { css } from '@panda/css';

import { useDevToolsNetwork } from './DevToolsNetworkContext';
import { DevToolsPanels } from './devTools/DevToolsPanels';
import { EmptyNetwork } from './devTools/EmptyNetwork';
import { Toolbar } from './devTools/Toolbar';

const devtoolsContainer = css({
	height: '100vh',
	display: 'flex',
	flexDirection: 'column'
});

const main = css({
	flex: 1,
	overflow: 'auto',
	color: 'var(--network-color-text)'
});

export const DevTools = () => {
	const {
		state: { networkRequests }
	} = useDevToolsNetwork();

	return (
		<div className={devtoolsContainer}>
			<Toolbar />
			<main className={main}>
				{networkRequests.length === 0 ? <EmptyNetwork /> : <DevToolsPanels />}
			</main>
		</div>
	);
};
