import JsonView from 'react18-json-view';

import './jsonEditor.css';

type JsonViewerProps = {
	data: unknown;
};

export const JsonViewer = ({ data }: JsonViewerProps) => {
	return (
		<JsonView
			src={data}
			collapseStringsAfterLength={Infinity}
			collapseObjectsAfterLength={Infinity}
			collapsed={false}
		/>
	);
};
