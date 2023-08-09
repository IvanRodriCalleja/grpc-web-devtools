import { css } from '@panda/css';

import { useDevToolsNetwork } from 'src/devtools/app/DevToolsNetworkContext';

const closeIcon = css({
	padding: '0 8px',
	height: '20px',
	width: '36px',
	minWidth: '36px',
	fill: 'var(--network-border)',
	_hover: {
		fill: 'white',
		cursor: 'pointer'
	}
});

export const CloseIcon = () => {
	const { onCloseNetwork } = useDevToolsNetwork();

	return (
		<svg onClick={onCloseNetwork} className={closeIcon} aria-hidden="true" viewBox="0 0 24 24">
			<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
		</svg>
	);
};
