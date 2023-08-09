import { css } from '@panda/css';

import { DetailHeader } from './networkRequest/DetailHeader';
import { DetailSection } from './networkRequest/DetailSection';
import { JsonViewer } from './networkRequest/JsonViewer';

const networkRequest = css({
	display: 'flex',
	flexDirection: 'column',
	height: '100%'
});

type NetworkRequestProps = {
	title: string;
	data: unknown;
};

export const NetworkRequest = ({ title, data }: NetworkRequestProps) => (
	<div className={networkRequest}>
		<DetailHeader title={title} />
		<DetailSection>
			<JsonViewer data={data} />
		</DetailSection>
	</div>
);
