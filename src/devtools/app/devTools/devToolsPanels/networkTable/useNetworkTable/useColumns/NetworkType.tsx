import { css } from '@panda/css';

type NetworkTypeProps = {
	type: 'unary' | 'stream';
};

const typeCell = css({
	textTransform: 'capitalize'
});

export const NetworkType = ({ type }: NetworkTypeProps) => <span className={typeCell}>{type}</span>;
