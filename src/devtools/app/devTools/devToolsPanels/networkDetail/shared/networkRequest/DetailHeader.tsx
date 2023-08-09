import { css, cx } from '@panda/css';

import { ellipsis } from '../../../networkTable/shared/tableStyles';
import { CloseIcon } from './detailHeader/CloseIcon';

const header = css({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	borderBottom: '1px solid var(--network-border)',
	padding: '4px 8px',
	fontWeight: '700',
	backgroundColor: 'var(--toolbar-bg-color)',
	color: 'var(--toolbar-color)',
	verticalAlign: 'middle',
	lineHeight: '18px'
});

const titleContainer = css({ flex: '1 1 auto' });

type DetailHeaderProps = {
	title: string;
};

export const DetailHeader = ({ title }: DetailHeaderProps) => {
	return (
		<div className={header}>
			<div className={cx(titleContainer, ellipsis)}>{title}</div>
			<CloseIcon />
		</div>
	);
};
