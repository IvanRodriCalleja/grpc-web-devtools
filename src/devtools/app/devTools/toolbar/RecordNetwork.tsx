import { css, cx } from '@panda/css';

import { useDevToolsNetwork } from '../../DevToolsNetworkContext';

const icon = css({
	height: '100%',
	cursor: 'pointer'
});

const stopIcon = css({
	fill: 'rgb(228, 105, 98)',
	padding: '1px'
});

const startIcon = css({
	fill: 'var(--network-row-icon-fill)'
});

type IconProps = {
	onClick: () => void;
};

const StartRecording = ({ onClick }: IconProps) => (
	<svg className={cx(icon, startIcon)} onClick={onClick} aria-hidden="true" viewBox="0 0 24 24">
		<title>Start Recording</title>
		<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
	</svg>
);

const StopRecording = ({ onClick }: IconProps) => (
	<svg
		className={cx(icon, stopIcon)}
		onClick={onClick}
		x="0px"
		y="0px"
		viewBox="0 0 256 256"
		enableBackground="new 0 0 256 256"
		xmlSpace="preserve">
		<title>Stop Recording</title>
		<path d="M157.5,87.4h-59c-6.1,0-11.1,5-11.1,11.1v59c0,6.1,5,11.1,11.1,11.1h59c6.1,0,11.1-5,11.1-11.1v-59C168.6,92.4,163.6,87.4,157.5,87.4z M128,10C62.8,10,10,62.8,10,128c0,65.2,52.8,118,118,118c65.2,0,118-52.8,118-118C246,62.8,193.2,10,128,10z M128,227c-54.7,0-99-44.4-99-99s44.3-99,99-99s99,44.3,99,99C227,182.7,182.7,227,128,227z" />
	</svg>
);

export const RecordNetwork = () => {
	const {
		onStartRecording,
		onStopRecording,
		state: { isRecording }
	} = useDevToolsNetwork();

	return isRecording ? (
		<StopRecording onClick={onStopRecording} />
	) : (
		<StartRecording onClick={onStartRecording} />
	);
};
