import { GrpcUnaryPartial } from 'src/shared';

import { NetworkRequest } from './shared/NetworkRequest';

type UnaryDetailProps = {
	unaryRequest: GrpcUnaryPartial;
};

export const UnaryDetail = ({ unaryRequest }: UnaryDetailProps) => {
	const data = {
		url: unaryRequest.url,
		status: unaryRequest.status,
		request: unaryRequest.request,
		response: unaryRequest.response
	};

	return (
		<NetworkRequest
			title={`${unaryRequest.url} (${unaryRequest.type}) - ${unaryRequest.time}ms`}
			data={data}
		/>
	);
};
