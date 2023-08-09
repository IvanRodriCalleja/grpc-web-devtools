import { css } from '@panda/css';

import { ClearNetworks } from './toolbar/ClearNetworks';
import { RecordNetwork } from './toolbar/RecordNetwork';

const header = css({
	display: 'flex',
	gap: '4px',
	padding: '4px 8px',
	height: '28px',
	background: 'var(--toolbar-bg-color)',
	borderBottom: '1px solid var(--network-border)'
});

export const Toolbar = () => {
	return (
		<header className={header}>
			<RecordNetwork />
			<ClearNetworks />
		</header>
	);
};
