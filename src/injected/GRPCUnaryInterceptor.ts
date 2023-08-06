import * as pb from 'google-protobuf';
import { Request, UnaryInterceptor, UnaryResponse } from 'grpc-web';

import {
	sendUnaryNetworkErrorMessage,
	sendUnaryNetworkRequestMessage,
	sendUnaryNetworkResponseMessage
} from './grpcUnaryInterceptor/unaryMessageSender';
import { createId } from './shared/createId';

export class GRPCUnaryInterceptor implements UnaryInterceptor<pb.Message, pb.Message> {
	intercept(
		request: Request<pb.Message, pb.Message>,
		invoker: (
			request: Request<pb.Message, pb.Message>
		) => Promise<UnaryResponse<pb.Message, pb.Message>>
	) {
		const start = performance.now();
		const networkId = createId();

		sendUnaryNetworkRequestMessage({ networkId, request });

		return invoker(request)
			.then((response: UnaryResponse<pb.Message, pb.Message>) => {
				const time = Math.round(performance.now() - start);
				sendUnaryNetworkResponseMessage({ response, networkId, time });

				return response;
			})
			.catch(error => {
				const time = Math.round(performance.now() - start);
				sendUnaryNetworkErrorMessage({ error, networkId, time });
				throw error;
			});
	}
}
