import { css } from '@panda/css';

const emptyNetwork = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	height: '100%',
	width: '100%'
});

const emptyNetworkText = css({
	textAlign: 'center',
	fontSize: '14px',
	lineHeight: '28px',
	fontWeight: 500
});

const lightText = css({
	color: 'var(--toolbar-input-text)',
	fontWeight: 700
});

const link = css({
	textDecoration: 'underline',
	_hover: {
		color: 'var(--toolbar-input-text)'
	}
});

export const EmptyNetwork = () => (
	<div className={emptyNetwork}>
		<div className={emptyNetworkText}>
			Recording <span className={lightText}>grpc-web</span> network activity...
		</div>
		<div className={emptyNetworkText}>Perform a request or hit ⌘ R to record the reload</div>
		<div className={emptyNetworkText}>
			<a
				className={link}
				href="https://github.com/IvanRodriCalleja/grpc-web-devtools"
				target="_blank"
				rel="noopener noreferrer">
				Learn more
			</a>
		</div>
	</div>
);
