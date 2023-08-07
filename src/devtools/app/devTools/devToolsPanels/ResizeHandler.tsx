import { css } from '@panda/css';
import { PanelResizeHandle } from 'react-resizable-panels';

const resizeHandle = css({
	position: 'relative',
	border: '1px solid var(--network-border)',
	height: '100%'
});

const resizableArea = css({
	top: 0,
	bottom: 0,
	left: '-5px',
	right: '-5px',
	cursor: 'ew-resize'
});

export const ResizeHandle = () => {
	return (
		<PanelResizeHandle>
			<div className={resizeHandle}>
				<div className={resizableArea} />
			</div>
		</PanelResizeHandle>
	);
};
