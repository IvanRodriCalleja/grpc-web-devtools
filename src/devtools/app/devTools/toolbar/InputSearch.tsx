import { css } from '@panda/css';

import { useDevToolsNetwork } from '../../DevToolsNetworkContext';
import { useDebounceSearch } from './inputSearch/useDebounceSearch';

const input = css({
	background: 'var(--toolbar-input-bg)',
	border: 'none',
	color: 'var(--toolbar-input-text)',
	display: 'inline-block',
	height: '18px',
	lineHeight: '20px',
	overflowX: 'visible',
	paddingLeft: '4px',
	whiteSpace: 'nowrap',
	width: '160px',
	outlineWidth: 0,
	'&::placeholder': {
		height: '18px',
		lineHeight: '20px'
	},
	_focus: {
		boxShadow: 'var(--focus-ring-active-shadow)'
	}
});
export const InputSearch = () => {
	const { state, onSetSearch } = useDevToolsNetwork();
	const { inputSearch, onSearchChange } = useDebounceSearch({
		value: state.search,
		onChange: onSetSearch
	});

	return (
		<div>
			<input
				onChange={event => onSearchChange(event.target.value)}
				value={inputSearch}
				className={input}
				type="text"
				placeholder="Url..."
			/>
		</div>
	);
};
