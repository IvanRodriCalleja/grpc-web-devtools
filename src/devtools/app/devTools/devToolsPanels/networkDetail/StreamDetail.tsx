import { GrpcStreamPartial } from 'src/shared';

import { NetworkRequest } from './shared/NetworkRequest';

type StreamDetailProps = {
	streamRequest: GrpcStreamPartial;
};

export const StreamDetailDetail = ({ streamRequest }: StreamDetailProps) => {
	console.log({ streamRequest });
	const data = {
		url: streamRequest.url,
		status: streamRequest.status,
		request: streamRequest.request,
		responses: streamRequest.responses
	};

	return (
		<NetworkRequest
			title={`${streamRequest.url} (${streamRequest.type}) - ${streamRequest.time}ms`}
			data={data}
		/>
	);
};
