import * as pb from 'google-protobuf';
import { ClientReadableStream, Request, StreamInterceptor } from 'grpc-web';

import {
	sendStreamNetworkDataMessageArgs,
	sendStreamNetworkEndMessageArgs,
	sendStreamNetworkErrorMessageArgs,
	sendStreamNetworkMetadataMessageArgs,
	sendStreamNetworkRequestMessageArgs,
	sendStreamNetworkStatusMessageArgs
} from './grpcUnaryInterceptor/streamMessageSender';
import { createId } from './shared/createId';

export class GRPCStreamInterceptor implements StreamInterceptor<pb.Message, pb.Message> {
	intercept(
		request: Request<pb.Message, pb.Message>,
		invoker: (request: Request<pb.Message, pb.Message>) => ClientReadableStream<pb.Message>
	): ClientReadableStream<pb.Message> {
		const start = performance.now();
		const networkId = createId();

		sendStreamNetworkRequestMessageArgs({ networkId, request });

		const stream = invoker(request);

		stream.on('data', data => {
			const time = Math.round(performance.now() - start);
			sendStreamNetworkDataMessageArgs({ data, networkId, time });
		});

		stream.on('metadata', metadata => {
			const time = Math.round(performance.now() - start);
			sendStreamNetworkMetadataMessageArgs({ metadata, networkId, time });
		});

		stream.on('status', status => {
			const time = Math.round(performance.now() - start);
			sendStreamNetworkStatusMessageArgs({ status, networkId, time });
		});

		stream.on('error', error => {
			const time = Math.round(performance.now() - start);
			sendStreamNetworkErrorMessageArgs({ error, networkId, time });
		});

		stream.on('end', () => {
			const time = Math.round(performance.now() - start);
			sendStreamNetworkEndMessageArgs({ networkId, time });
		});

		return stream;
	}
}
