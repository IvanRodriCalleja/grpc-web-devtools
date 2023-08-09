import { GrpcNetworkPartial } from 'src/shared';

import { StreamDetailDetail } from './networkDetail/StreamDetail';
import { UnaryDetail } from './networkDetail/UnaryDetail';

type NetworkDetailProps = {
	networkRequest: GrpcNetworkPartial;
};

export const NetworkDetail = ({ networkRequest }: NetworkDetailProps) => {
	if (networkRequest.type === 'unary') return <UnaryDetail unaryRequest={networkRequest} />;

	return <StreamDetailDetail streamRequest={networkRequest} />;
};
