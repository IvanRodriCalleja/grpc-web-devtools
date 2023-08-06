import { css } from '@panda/css';

export const cell = css({
	padding: '5px 8px',
	borderRight: '1px solid var(--network-border)',
	'&:last-child': {
		borderRight: 'none'
	}
});

export const ellipsis = css({
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden'
});
